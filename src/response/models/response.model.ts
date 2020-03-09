import Status from "./status.enum";

class Response {
    status?: Status
    message?: string;

    constructor(status?: Status, message?: string) {
        this.status = status;
        this.message = message;
    }
}

export default Response;