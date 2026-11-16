export class HttpError extends Error {
    status;
    constructor(status) {
        super(`HTTP Error: ${status}`);
        this.status = status;
        this.name = 'HttpError';
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
//# sourceMappingURL=http-error.js.map