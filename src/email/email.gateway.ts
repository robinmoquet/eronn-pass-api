import { EmailGatewayInterface } from './email.gateway.interface';
import { EmailResponse } from './models/email.response';
import { ConfirmationEmailOptionsInterface } from './models/options/confirmation.email.options.interface';
import { SERVER_NAME } from '../config/config.email';
import fetch from 'node-fetch';

export class EmailGateway implements EmailGatewayInterface {
    async sendConfirmationEmail(options: ConfirmationEmailOptionsInterface): Promise<EmailResponse> {
        const response = new EmailResponse();
        const mailerRes = await fetch(`${SERVER_NAME}/confirmation-email`, {
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            },
            method: 'POST',
            body: JSON.stringify(options),
        });

        const body: any = await mailerRes.json();
        if (body.status !== 'success') {
            response.message = body.message;
        }
        response.status = body.status;

        return response;
    }
}
