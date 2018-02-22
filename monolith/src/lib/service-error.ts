export class ServiceError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);

    //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.code = code;
  }
}
