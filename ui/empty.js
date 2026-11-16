export function renderEmpty(container) {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty';
    emptyEl.textContent = 'No countries found. Try another search.';
    container.appendChild(emptyEl);
}
//# sourceMappingURL=empty.js.map