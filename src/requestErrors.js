

class RequestError extends Error {
  constructor({data, code, message, status}) {
    super();
    this.data = data;
    this.code = code;
    this.message = message;
    this.status = status;
  }

  toString() {
    return `${this.getName()} (${this.code}): ${this.message}`;
  }

  getName() {
    return 'Api Request Error';
  }
}

export class ValidationError extends RequestError {
  getName() {
    return 'Api Validation Error';
  }
}

export class NotFoundError extends RequestError {
  getName() {
    return 'Api Error';
  }
}

export class AuthError extends RequestError {
  getName() {
    return 'Api Authentication Error';
  }
}

export class ServerError extends RequestError {
  getName() {
    return 'Api Server Error';
  }
}
