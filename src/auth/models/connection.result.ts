import { ConnectionResultInterface, Status } from "./connection.result.interface";


export class ConnectionResult implements ConnectionResultInterface {

    _status: Status;

    _message: string;

    _jwt: string;

    get jwt (): string
    {
        return this._jwt;
    }

    set jwt(jwt: string)
    {
        this._jwt = jwt;
    }

    set status(status: Status)
    {
        this._status = status;
    }

    get status (): Status
    {
        return this._status;
    }

    set message(message: string)
    {
        this._message = message;
    }

    get message (): string
    {
        return this._message;
    }


}