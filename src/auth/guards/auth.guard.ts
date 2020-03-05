import { Role } from '../models/role.enum';
import { AuthGuardError } from './auth.guard.error';
import { UserInterface } from '../models/user.interface';
import { rolesWeight } from '../models/roles.weight';
import { User } from '../../user/models/entity/user.entity';

/**
 * Permet de controller l'accès au resources
 *
 * @class
 */
export class AuthGuard {
    /**
     * Control que le poid du role soit supérieur ou égale au role demander
     *
     * @param  {Role} roleTarget
     * @param  {Role} role
     * @returns boolean
     */
    private static roleHaveBiggerWeight(roleTarget: Role, role: Role): boolean {
        if (rolesWeight[role] >= rolesWeight[roleTarget]) return true;
        else return false;
    }

    /**
     * Control que le user a au minimun le role demander
     *
     * @param  {Role} role
     * @param  {UserInterface} user
     * @returns void
     */
    static isGranted(role: Role, user: UserInterface): void {
        if (!this.roleHaveBiggerWeight(role, user.getRole())) {
            throw new AuthGuardError(
                `This user not have role ${role}, this user have role ${user.getRole()}`
            );
        }
    }

    /**
     * Controle que le user est une instance de User
     *
     * @param  {UserInterface} user
     * @returns User
     */
    static isUser(user: UserInterface): User {
        if (user instanceof User) {
        } else {
            throw new Error('This user in not type "User"');
        }
        return user;
    }
}
