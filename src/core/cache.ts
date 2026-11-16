import { searchCountries } from './searchCountries.js';
import { RawCountry } from './types.js';

export function createSearchCache() {
  const inFlight = new Map<
    string,
    {
      promise: Promise<RawCountry[]>;
      controller: AbortController;
      listenersCount: number;
    }
  >();
  const results = new Map<string, RawCountry[]>();

  return {
    get(query: string, signal: AbortSignal): Promise<RawCountry[]> {
      if (results.has(query)) {
        return Promise.resolve(results.get(query)!);
      }

      if (inFlight.has(query)) {
        const request = inFlight.get(query)!;
        request.listenersCount++;

        const abortPromise = new Promise<never>((_, reject) => {
          const onAbort = () => {
            request.listenersCount--;

            if (request.listenersCount === 0) {
              request.controller.abort();
              inFlight.delete(query);
            }

            reject(new DOMException('Aborted', 'AbortError'));
          };

          signal.addEventListener('abort', onAbort);
          request.promise
            .finally(() => signal.removeEventListener('abort', onAbort))
            .catch(() => {});
        });

        return Promise.race([request.promise, abortPromise]);
      }

      const controller = new AbortController();
      const promise = searchCountries(query, controller.signal)
        .then((data) => {
          results.set(query, data);
          inFlight.delete(query);
          return data;
        })
        .catch((error) => {
          inFlight.delete(query);
          throw error;
        });

      const request = { promise, controller, listenersCount: 1 };
      inFlight.set(query, request);

      const abortPromise = new Promise<never>((_, reject) => {
        const onAbort = () => {
          request.listenersCount--;

          if (request.listenersCount === 0) {
            controller.abort();
            inFlight.delete(query);
          }

          reject(new DOMException('Aborted', 'AbortError'));
        };

        signal.addEventListener('abort', onAbort);
        promise.finally(() => signal.removeEventListener('abort', onAbort)).catch(() => {});
      });

      return Promise.race([promise, abortPromise]);
    },
  };
}
