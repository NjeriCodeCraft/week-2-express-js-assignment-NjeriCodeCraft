// utils/errors.js
class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message = 'Invalid Data') {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

module.exports = { NotFoundError, ValidationError };
