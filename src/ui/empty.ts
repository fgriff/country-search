export function renderEmpty(container: HTMLElement): void {
  const emptyEl = document.createElement('div');
  emptyEl.className = 'empty';
  emptyEl.textContent = 'No countries found. Try another search.';
  container.appendChild(emptyEl);
}
