import { createSearchController } from '../core/searchController';
import { SearchController } from '../core/types';

describe('SearchController', () => {
  let controller: SearchController;
  let mockFetch: jest.Mock;
  let mockOnStateChange: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockOnStateChange = jest.fn();
    controller = createSearchController(mockOnStateChange, 300); // Изменено
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('При пустом вводе переходит в состояние idle', () => {
    controller.onInput('');
    expect(mockOnStateChange).toHaveBeenCalledWith({ type: 'idle' });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('При вводе переходит в loading и отправляет запрос', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          name: 'Spain',
          flags: { png: '' },
          region: '',
          population: 1,
          area: 1,
        },
      ],
    });

    controller.onInput('spain');
    expect(mockOnStateChange).toHaveBeenCalledWith({ type: 'loading' });

    jest.advanceTimersByTime(300);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockOnStateChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
  });

  it('Отменяет предыдущий запрос при новом вводе', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    controller.onInput('sp');
    jest.advanceTimersByTime(300);

    controller.onInput('spain');
    expect(abortSpy).toHaveBeenCalled();
  });
});
