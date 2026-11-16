import { showModal } from './modal.js';
export function createCountryCard(country) {
    const li = document.createElement('li');
    li.className = 'country__card';
    li.addEventListener('click', () => showModal(country));
    const img = document.createElement('img');
    img.src = country.flag;
    img.alt = `Flag of ${country.name}`;
    img.className = 'country__flag';
    const title = document.createElement('h3');
    title.textContent = country.name;
    title.className = 'country__name';
    const infoList = document.createElement('ul');
    infoList.className = 'country__info-list';
    const createInfoRow = (icon, text) => {
        const row = document.createElement('li');
        row.className = 'info__row';
        const iconSpan = document.createElement('span');
        iconSpan.textContent = icon;
        iconSpan.className = 'info__icon';
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        textSpan.className = 'info__text';
        row.appendChild(iconSpan);
        row.appendChild(textSpan);
        return row;
    };
    infoList.appendChild(createInfoRow('🏛️', country.capital));
    infoList.appendChild(createInfoRow('🌍', country.region));
    infoList.appendChild(createInfoRow('👥', country.population.toLocaleString()));
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(infoList);
    return li;
}
//# sourceMappingURL=country%D0%A1ard.js.map