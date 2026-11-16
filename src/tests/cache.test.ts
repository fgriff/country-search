import { createSearchCache } from '../core/cache.js';

describe('Search Cache', () => {
  it('Возвращает закэшированный промис при повторном запросе и не делает повторный fetch', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ name: 'Spain' }],
    });
    global.fetch = mockFetch;

    const cache = createSearchCache();
    const signal = new AbortController().signal;

    const promise1 = cache.get('spain', signal);
    const promise2 = cache.get('spain', signal);

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(result1).toEqual([{ name: 'Spain' }]);
    expect(result2).toEqual([{ name: 'Spain' }]);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
