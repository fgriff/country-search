export class HttpError extends Error {
  constructor(_status: number) {
    super('Not implemented');
    throw new Error('HttpError is not implemented yet');
  }
}
