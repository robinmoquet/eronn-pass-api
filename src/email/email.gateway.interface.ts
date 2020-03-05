import { EmailResponse } from './models/email.response';
import { ConfirmationEmailOptionsInterface } from './models/options/confirmation.email.options.interface';

export interface EmailGatewayInterface {
    sendConfirmationEmail(options: ConfirmationEmailOptionsInterface): Promise<EmailResponse>;
}
