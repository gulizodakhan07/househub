import { BaseException } from "./base-exception.js";

export class BadRequestException extends BaseException{
    constructor(){
        super();
        this.statusCode = 400;
        this.name = "Bad Request Exception";
        this.message = message;
    }
}