import { RawCountry } from '../core/types';
import { mapCountryResponse } from '../core/mapCountryResponse';

describe('mapCountryResponse', () => {
  it('Должна корректно маппить полный ответ API', () => {
    const raw: RawCountry = {
      area: 640679,
      name: 'France',
      flags: {
        png: 'https://flagcdn.com/w320/fr.png',
        svg: 'https://flagcdn.com/fr.svg',
      },
      region: 'Europe',
      borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
      capital: 'Paris',
      languages: [
        {
          name: 'French',
          nativeName: 'français',
        },
      ],
      currencies: [
        {
          name: 'Euro',
          symbol: '€',
        },
      ],
      population: 67391582,
    };

    const result = mapCountryResponse(raw);

    expect(result).toEqual({
      name: 'France',
      flag: 'https://flagcdn.com/w320/fr.png',
      capital: 'Paris',
      region: 'Europe',
      population: 67391582,
      languages: ['French'],
      area: 640679,
      borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
      currencies: ['Euro'],
    });
  });

  it('Должна корректно обрабатывать отсутствующие поля (Антарктида)', () => {
    const raw: RawCountry = {
      area: 14000000,
      name: 'Antarctica',
      flags: {
        png: 'https://flagcdn.com/w320/aq.png',
        svg: 'https://flagcdn.com/aq.svg',
      },
      region: 'Polar',
      languages: [
        {
          name: 'English',
          nativeName: 'English',
        },
        {
          name: 'Russian',
          nativeName: 'Русский',
        },
      ],
      population: 1000,
    };

    const result = mapCountryResponse(raw);

    expect(result).toEqual({
      name: 'Antarctica',
      flag: 'https://flagcdn.com/w320/aq.png',
      capital: 'No data',
      region: 'Polar',
      population: 1000,
      languages: ['English', 'Russian'],
      area: 14000000,
      borders: [],
      currencies: [],
    });
  });

  it('Должна игнорировать лишние поля из реального API', () => {
    const raw: RawCountry = {
      area: 640679,
      cioc: 'FRA',
      flag: '🇫🇷',
      gini: 32.4,
      name: 'France',
      flags: {
        png: 'https://flagcdn.com/w320/fr.png',
        svg: 'https://flagcdn.com/fr.svg',
      },
      latlng: [46, 2],
      region: 'Europe',
      borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
      capital: 'Paris',
      demonym: 'French',
      languages: [
        {
          name: 'French',
          iso639_1: 'fr',
          iso639_2: 'fra',
          nativeName: 'français',
        },
      ],
      subregion: 'Western Europe',
      timezones: ['UTC-10:00', 'UTC+01:00'],
      alpha2Code: 'FR',
      alpha3Code: 'FRA',
      currencies: [
        {
          code: 'EUR',
          name: 'Euro',
          symbol: '€',
        },
      ],
      nativeName: 'France',
      population: 67391582,
      independent: true,
      numericCode: '250',
      callingCodes: ['33'],
      topLevelDomain: ['.fr'],
      populationDensity: 105.19,
    };

    const result = mapCountryResponse(raw);

    expect(result.name).toBe('France');
    expect(result.capital).toBe('Paris');
    expect(result.languages).toEqual(['French']);
    expect(result.currencies).toEqual(['Euro']);
    expect(result).toBeDefined();
  });
});
