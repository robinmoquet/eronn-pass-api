import { ConnectionDto } from './models/connection.dto';
import { User } from '../user/models/entity/user.entity';

export interface AuthCheckerInterface {
    preCheck(user: User, connectionDto: ConnectionDto): void;

    check(user: User, connectionDto: ConnectionDto): Promise<void>;

    postCheck(user: User, connectionDto: ConnectionDto): void;
}
