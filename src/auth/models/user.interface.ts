import { Role } from './role.enum';

export interface UserInterface {
    getUsername(): string;

    getPassword(): string;

    getRole(): Role;
}
