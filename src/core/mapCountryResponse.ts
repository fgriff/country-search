import { Country, RawCountry } from './types.js';

export function mapCountryResponse(raw: RawCountry): Country {
  return {
    name: raw.name,
    flag: raw.flags.png,
    capital: raw.capital ?? 'No data',
    region: raw.region,
    population: raw.population,
    languages: raw.languages ? raw.languages.map((lang) => lang.name) : [],
    area: raw.area,
    borders: raw.borders ?? [],
    currencies: raw.currencies ? raw.currencies.map((curr) => curr.name) : [],
  };
}
