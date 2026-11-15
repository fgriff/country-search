import { HttpError } from './http-error.js';
import { RawCountry } from './types.js';

export async function searchCountries(query: string, _signal: AbortSignal): Promise<RawCountry[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const response = await fetch(url);

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
