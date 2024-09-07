import { BaseException } from "./base-exception.js";

export class NotFoundException extends BaseException {
    constructor(message){
        super()
        this.statusCode = 404
        this.name = "Not found exception!"
        this.message = message
    }
}