import { createSearchController } from '../core/searchController';
import { SearchController } from '../core/types';

describe('Race Condition', () => {
  let controller: SearchController;
  let mockOnStateChange: jest.Mock;
  let fetchResolvers: Array<{
    query: string;
    resolve: (val: unknown) => void;
    reject: (err: unknown) => void;
  }>;

  beforeEach(() => {
    jest.useFakeTimers();

    jest.spyOn(AbortSignal, 'timeout').mockReturnValue(new AbortController().signal);

    mockOnStateChange = jest.fn();
    fetchResolvers = [];

    global.fetch = jest.fn().mockImplementation((url: string, options: RequestInit) => {
      const query = decodeURIComponent(url.split('/').pop()!);

      return new Promise((resolve, reject) => {
        fetchResolvers.push({ query, resolve, reject });
        options.signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    controller = createSearchController(mockOnStateChange, 300);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('Не должен рендерить устаревший ответ, если он пришел позже', async () => {
    controller.onInput('sp');
    jest.advanceTimersByTime(300);

    controller.onInput('spain');
    jest.advanceTimersByTime(300);

    expect(fetchResolvers.length).toBe(2);
    expect(fetchResolvers[0].query).toBe('sp');
    expect(fetchResolvers[1].query).toBe('spain');

    fetchResolvers[1].resolve({
      ok: true,
      status: 200,
      json: async () => [
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
      ],
    });

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(mockOnStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'success' }),
    );

    try {
      fetchResolvers[0].resolve({
        ok: true,
        status: 200,
        json: async () => [
          {
            name: 'Spain (old)',
            flags: {
              png: 'url',
              svg: 'url',
            },
            region: 'Europe',
            population: 1,
            area: 1,
          },
        ],
      });
    } catch {
      // Ignore
    }

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    const lastCall = mockOnStateChange.mock.calls[mockOnStateChange.mock.calls.length - 1][0];
    expect(lastCall.type).toBe('success');
    expect(lastCall.data[0].name).toBe('Spain');

    expect(mockOnStateChange).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
  });
});
