const STORAGE_KEY = 'fgriff-country-search';
const MAX_ITEMS = 10;

export function getHistory(): string[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(data);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export function addToHistory(query: string): void {
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
