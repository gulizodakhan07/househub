export class BaseException extends Error {
    constructor() {
      super();
      this.isException = true;
    }
  }
  export default new BaseException()