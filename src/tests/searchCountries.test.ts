import { HttpError } from '../core/http-error';
import { searchCountries } from '../core/searchCountries';
import { RawCountry } from '../core/types';

describe('searchCountries', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch;
  });

  it('Возвращает массив стран при успешном ответе (200)', async () => {
    const mockData: RawCountry[] = [
      {
        name: 'Spain',
        flags: {
          png: 'url',
          svg: 'url',
        },
        region: 'Europe',
        population: 1,
        area: 1,
      },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const signal = new AbortController().signal;
    const result = await searchCountries('spain', signal);

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://countries.dev/name/spain',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('Возвращает пустой массив при 404 (нет совпадений) — не ошибка', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const signal = new AbortController().signal;
    const result = await searchCountries('unknown', signal);

    expect(result).toEqual([]);
  });

  it('Бросает HttpError при 500', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const signal = new AbortController().signal;
    await expect(searchCountries('error', signal)).rejects.toThrow(HttpError);
  });
});
