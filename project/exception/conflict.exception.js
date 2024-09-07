import { BaseException } from "./base-exception.js";

export class ConflictException extends BaseException{
    constructor(message){
        super()
        this.statusCode = 409
        this.name = "Confilct exception"
        this.message = message

    }
}