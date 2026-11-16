import { HttpError } from './http-error.js';
import { ErrorType } from './types.js';

export function classifyError(error: unknown): ErrorType {
  if (error instanceof DOMException) {
    if (error.name === 'AbortError') {
      return 'aborted';
    }

    if (error.name === 'TimeoutError') {
      return 'timeout';
    }
  }

  if (error instanceof HttpError) {
    return 'http';
  }

  if (error instanceof TypeError) {
    return 'network';
  }

  return 'unknown';
}
