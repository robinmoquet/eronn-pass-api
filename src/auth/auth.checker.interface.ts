import { UserInterface } from "./models/user.interface";
import { ConnectionDto } from "./models/connection.dto";

export interface AuthCheckerInterface {

    preCheck(user: UserInterface, connectionDto: ConnectionDto): void

    check(user: UserInterface, connectionDto: ConnectionDto): Promise<void>

    postCheck(user: UserInterface, connectionDto: ConnectionDto): void

}