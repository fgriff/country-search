import { HttpError } from '../core/http-error';

describe('HttpError', () => {
  it('Должен сохранять статус ответа', () => {
    const error = new HttpError(500);
    expect(error.status).toBe(500);
  });

  it('Должен иметь правильное имя и сообщение', () => {
    const error = new HttpError(404);
    expect(error.name).toBe('HttpError');
    expect(error.message).toBe('HTTP Error: 404');
  });

  it('Должен быть экземпляром Error', () => {
    const error = new HttpError(500);
    expect(error).toBeInstanceOf(Error);
  });
});
