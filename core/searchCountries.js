import { HttpError } from './http-error.js';
const DEFAULT_TIMEOUT = 5000;
export async function searchCountries(query, signal, timeoutMs = DEFAULT_TIMEOUT) {
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
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new HttpError(500);
    }
    return data;
}
//# sourceMappingURL=searchCountries.js.map