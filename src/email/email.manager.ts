import { EmailGatewayInterface } from './email.gateway.interface';
import { EmailGateway } from './email.gateway';

export class EmailManager {
    private static _gateway: EmailGatewayInterface;

    public static get Gateway(): EmailGatewayInterface {
        if (!this._gateway) this._gateway = new EmailGateway();
        return this._gateway;
    }
}
