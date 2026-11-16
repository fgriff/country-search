import { addToHistory, getHistory } from '../core/history';

describe('Search History', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Сохраняет запросы в обратном порядке (новые сверху)', () => {
    addToHistory('spain');
    addToHistory('france');

    const history = getHistory();
    expect(history).toEqual(['france', 'spain']);
  });

  it('Не сохраняет дубликаты, а перемещает существующий запрос наверх', () => {
    addToHistory('spain');
    addToHistory('france');
    addToHistory('spain');

    const history = getHistory();
    expect(history).toEqual(['spain', 'france']);
  });

  it('Ограничивает историю 10 последними запросами', () => {
    addToHistory('1');
    addToHistory('2');
    addToHistory('3');
    addToHistory('4');
    addToHistory('5');
    addToHistory('6');
    addToHistory('7');
    addToHistory('8');
    addToHistory('9');
    addToHistory('10');
    addToHistory('11');

    const history = getHistory();
    expect(history).toHaveLength(10);
    expect(history).toEqual(['11', '10', '9', '8', '7', '6', '5', '4', '3', '2']);
  });
});
