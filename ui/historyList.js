import { getHistory } from '../core/history.js';
export function renderHistory(container, onSelect) {
    container.textContent = '';
    const history = getHistory();
    if (history.length === 0)
        return;
    const wrapper = document.createElement('div');
    wrapper.className = 'history__wrapper';
    const title = document.createElement('span');
    title.textContent = 'Recent: ';
    title.className = 'history__title';
    wrapper.appendChild(title);
    history.forEach((query) => {
        const btn = document.createElement('button');
        btn.textContent = query;
        btn.className = 'history__btn';
        btn.addEventListener('click', () => onSelect(query));
        wrapper.appendChild(btn);
    });
    container.appendChild(wrapper);
}
//# sourceMappingURL=historyList.js.map