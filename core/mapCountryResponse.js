export function mapCountryResponse(raw) {
    return {
        name: raw.name,
        flag: raw.flags.png,
        capital: raw.capital ?? 'No data',
        region: raw.region,
        population: raw.population,
        languages: raw.languages ? raw.languages.map((lang) => lang.name) : [],
        area: raw.area ?? 0,
        borders: raw.borders ?? [],
        currencies: raw.currencies ? raw.currencies.map((curr) => curr.name) : [],
    };
}
//# sourceMappingURL=mapCountryResponse.js.map