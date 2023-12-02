export class ApiError extends Error {
    constructor (public message:string,public statusCode:number, public status?:string,public isOperetional?: boolean){
        super(message)
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error'
        this.isOperetional = true
    }
}