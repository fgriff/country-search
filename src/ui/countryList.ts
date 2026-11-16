import { Country } from '../core/types.js';
import { createCountryCard } from './countryСard.js';

export function renderCountryList(container: HTMLElement, countries: Country[]): void {
  const list = document.createElement('ul');
  list.className = 'country__list';

  countries.forEach((country) => {
    const li = createCountryCard(country);
    list.appendChild(li);
  });

  container.appendChild(list);
}
