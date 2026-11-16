import { createCountryCard } from './countryСard.js';
export function renderCountryList(container, countries) {
    const list = document.createElement('ul');
    list.className = 'country__list';
    countries.forEach((country) => {
        const li = createCountryCard(country);
        list.appendChild(li);
    });
    container.appendChild(list);
}
//# sourceMappingURL=countryList.js.map