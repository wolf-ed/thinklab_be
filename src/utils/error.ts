export class ApiError extends Error {
  data: any;
  extensions: any;
  code: number;

  constructor(
    message: string,
    code: number,
    data: any = null,
    extensions: any = null
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
    this.data = data;
    this.extensions = extensions;
    this.code = code;
  }
}
