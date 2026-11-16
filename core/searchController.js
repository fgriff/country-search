import { createSearchCache } from './cache.js';
import { classifyError } from './classifyError.js';
import { debounce } from './debounce.js';
import { addToHistory } from './history.js';
import { mapCountryResponse } from './mapCountryResponse.js';
const DEFAULT_DELAY = 300;
export function createSearchController(onStateChange, debounceDelay = DEFAULT_DELAY) {
    let currentAbortController = null;
    let lastQuery = '';
    const cache = createSearchCache();
    const executeSearch = async (query) => {
        if (currentAbortController) {
            currentAbortController.abort();
        }
        currentAbortController = new AbortController();
        const signal = currentAbortController.signal;
        try {
            const rawData = await cache.get(query, signal);
            if (rawData.length === 0) {
                onStateChange({ type: 'empty' });
            }
            else {
                const mapped = rawData.map(mapCountryResponse);
                addToHistory(query);
                onStateChange({ type: 'success', data: mapped });
            }
        }
        catch (error) {
            const errorType = classifyError(error);
            if (errorType === 'aborted') {
                return;
            }
            if (errorType === 'timeout') {
                onStateChange({
                    type: 'error',
                    message: 'The server response timed out.',
                    lastQuery: query,
                });
                return;
            }
            onStateChange({
                type: 'error',
                message: 'An error occurred while loading data.',
                lastQuery: query,
            });
        }
    };
    const debouncedSearch = debounce(executeSearch, debounceDelay);
    const onInput = (query) => {
        const trimmed = query.trim();
        if (currentAbortController) {
            currentAbortController.abort();
            currentAbortController = null;
        }
        if (!trimmed) {
            lastQuery = '';
            onStateChange({ type: 'idle' });
            return;
        }
        lastQuery = trimmed;
        onStateChange({ type: 'loading' });
        debouncedSearch(trimmed);
    };
    const retry = () => {
        if (lastQuery) {
            onStateChange({ type: 'loading' });
            executeSearch(lastQuery);
        }
    };
    return { onInput, retry };
}
//# sourceMappingURL=searchController.js.map