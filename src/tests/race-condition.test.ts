import { createSearchController } from '../core/searchController';
import { SearchController } from '../core/types';

const flushPromises = () =>
  new Promise((resolve) => {
    jest.requireActual('timers').setImmediate(resolve);
  });

interface FetchResolver {
  query: string;
  resolve: (val: unknown) => void;
  reject: (err: unknown) => void;
}

describe('Race Condition', () => {
  let controller: SearchController;
  let mockOnStateChange: jest.Mock;
  let fetchResolvers: FetchResolver[];

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnStateChange = jest.fn();
    fetchResolvers = [];

    global.fetch = jest.fn().mockImplementation((url: string, options: RequestInit) => {
      const query = decodeURIComponent(url.split('/').pop()!);

      let resolveFn: ((val: unknown) => void) | undefined;
      let rejectFn: ((err: unknown) => void) | undefined;

      const promise = new Promise((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;

        if (options.signal) {
          options.signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }
      });

      promise.catch(() => {});

      fetchResolvers.push({
        query,
        resolve: (val: unknown) => {
          if (resolveFn) resolveFn(val);
        },
        reject: (err: unknown) => {
          if (rejectFn) rejectFn(err);
        },
      });

      return promise;
    });

    controller = createSearchController(mockOnStateChange, 300);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('Не должен рендерить устаревший ответ, если он пришел позже', async () => {
    controller.onInput('sp');
    jest.advanceTimersByTime(300);

    controller.onInput('spain');
    jest.advanceTimersByTime(300);

    expect(fetchResolvers.length).toBe(2);
    expect(fetchResolvers[0].query).toBe('sp');
    expect(fetchResolvers[1].query).toBe('spain');

    fetchResolvers[1].resolve({
      ok: true,
      status: 200,
      json: async () => [
        {
          name: 'Spain',
          flags: { png: '' },
          region: '',
          population: 1,
          area: 1,
        },
      ],
    });

    await flushPromises();

    expect(mockOnStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'success' }),
    );

    try {
      fetchResolvers[0].resolve({
        ok: true,
        status: 200,
        json: async () => [
          {
            name: 'Spain (old)',
            flags: { png: '' },
            region: '',
            population: 1,
            area: 1,
          },
        ],
      });
    } catch {
      // Ignore
    }

    await flushPromises();

    const lastCall = mockOnStateChange.mock.calls[mockOnStateChange.mock.calls.length - 1][0];
    expect(lastCall.type).toBe('success');
    expect(lastCall.data[0].name).toBe('Spain');

    expect(mockOnStateChange).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
  });
});
