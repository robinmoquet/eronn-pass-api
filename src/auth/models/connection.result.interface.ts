export enum Status {
    SUCCESS = 'success',
    ERRORR = 'error'
}

export interface ConnectionResultInterface {

    _jwt: string;

    _status: Status;

    _message: string;

}