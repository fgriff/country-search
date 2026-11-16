import { classifyError } from '../core/classifyError';
import { HttpError } from '../core/http-error';

describe('classifyError', () => {
  it('Определяет отмену (AbortError)', () => {
    const error = new DOMException('Aborted', 'AbortError');
    expect(classifyError(error)).toBe('aborted');
  });

  it('Определяет таймаут (TimeoutError)', () => {
    const error = new DOMException('Timeout', 'TimeoutError');
    expect(classifyError(error)).toBe('timeout');
  });

  it('Определяет HTTP-ошибку (HttpError)', () => {
    const error = new HttpError(500);
    expect(classifyError(error)).toBe('http');
  });

  it('Определяет сетевую ошибку (TypeError)', () => {
    const error = new TypeError('Failed to fetch');
    expect(classifyError(error)).toBe('network');
  });

  it('Определяет неизвестную ошибку', () => {
    const error = new Error('Something');
    expect(classifyError(error)).toBe('unknown');
  });
});
