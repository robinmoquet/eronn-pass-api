import { AuthCheckerInterface } from "./auth.checker.interface";
import { UserInterface } from "./models/user.interface";
import { PasswordManager } from "../security/password.manager";
import { ConnectionDto } from "./models/connection.dto";

export class UserChecker implements AuthCheckerInterface {

    preCheck(user: UserInterface, connectionDto: ConnectionDto): void
    {
        // throw new Error('etst 1')
    }
    
    async check(user: UserInterface, connectionDto: ConnectionDto): Promise<void>
    {
        const password = user.getPassword();
        let samePassword = await PasswordManager.Instance.comparePassword(connectionDto.password, password);
    
        if (!samePassword) throw new Error('Invalid password');
    }
    
    postCheck(user: UserInterface, connectionDto: ConnectionDto): void
    {
        // throw new Error('etst 3')
    }

}