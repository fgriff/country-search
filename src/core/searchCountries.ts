import { HttpError } from './http-error.js';
import { RawCountry } from './types.js';

const DEFAULT_TIMEOUT = 5000;

export async function searchCountries(
  query: string,
  signal: AbortSignal,
  timeoutMs: number = DEFAULT_TIMEOUT,
): Promise<RawCountry[]> {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const combinedSignal = AbortSignal.any([signal, timeoutSignal]);

  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal: combinedSignal });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new HttpError(500);
  }

  return data as RawCountry[];
}
