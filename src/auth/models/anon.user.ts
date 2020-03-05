import { UserInterface } from './user.interface';
import { Role } from './role.enum';

export class AnonUser implements UserInterface {
    getUsername(): string {
        return 'anon';
    }

    getPassword(): string {
        return '';
    }

    getRole(): Role {
        return Role.ROLE_ANON;
    }
}
