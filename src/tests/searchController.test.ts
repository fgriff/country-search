import { createSearchController } from '../core/searchController';
import { SearchController } from '../core/types';

const flushPromises = () =>
  new Promise((resolve) => {
    jest.requireActual('timers').setImmediate(resolve);
  });

describe('SearchController', () => {
  let controller: SearchController;
  let mockFetch: jest.Mock;
  let mockOnStateChange: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockOnStateChange = jest.fn();
    localStorage.clear();
    controller = createSearchController(mockOnStateChange, 300);
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
      status: 200,
      json: async () => [{ name: 'Spain', flags: { png: '' }, region: '', population: 1, area: 1 }],
    });

    controller.onInput('spain');
    expect(mockOnStateChange).toHaveBeenCalledWith({ type: 'loading' });

    jest.advanceTimersByTime(300);
    await flushPromises();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockOnStateChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
  });

  it('Отменяет предыдущий запрос при новом вводе', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    mockFetch.mockImplementation((_url, options) => {
      return new Promise((_resolve, reject) => {
        options.signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    controller.onInput('sp');
    jest.advanceTimersByTime(300);

    controller.onInput('spain');
    expect(abortSpy).toHaveBeenCalled();
  });
});
