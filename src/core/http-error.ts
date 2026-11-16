export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP Error: ${status}`);
    this.name = 'HttpError';

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
