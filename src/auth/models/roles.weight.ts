import { Role } from './role.enum';

/**
 * Définit le poids de chaque roles.
 * Exemple:
 * Si un user est ROLE_ADMIN (100 poid) alors il pourra
 * accéder à n'import quel ressource avec un poid inférieurs
 */
export const rolesWeight = {
    [Role.ROLE_ADMIN]: 100,
    [Role.ROLE_USER]: 10,
    [Role.ROLE_ANON]: 1,
};
