export interface RawCountry {
  name: string;
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  population: number;
  area: number;
  capital?: string;
  languages?: Array<{
    name: string;
    nativeName: string;
    [key: string]: unknown;
  }>;
  borders?: string[];
  currencies?: Array<{
    name: string;
    symbol: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export interface Country {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: string[];
  area: number;
  borders: string[];
  currencies: string[];
}
