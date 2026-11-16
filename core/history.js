const STORAGE_KEY = 'fgriff-country-search';
const MAX_ITEMS = 10;
export function getHistory() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [];
    }
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
export function addToHistory(query) {
    const trimmed = query.trim();
    if (!trimmed) {
        return;
    }
    const history = getHistory();
    const filtered = history.filter((item) => item !== trimmed);
    filtered.unshift(trimmed);
    const limited = filtered.slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
}
//# sourceMappingURL=history.js.map