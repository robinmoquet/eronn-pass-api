import Status from "../../response/models/status.enum";

export interface ConnectionResultInterface {
    _jwt: string;

    _status: Status;

    _message: string;
}
