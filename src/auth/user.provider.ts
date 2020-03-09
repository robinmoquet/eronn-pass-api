import { AuthProviderInterface } from './auth.provider.interface';
import { UserInterface } from './models/user.interface';
import { JwtManager } from '../security/jwt.manager';
import { UserRepository } from '../user/models/repositories/user.repository';
import { AnonUser } from './models/anon.user';
import { User } from '../user/models/entity/user.entity';

export class UserProvider implements AuthProviderInterface {
    /**
     * Récupere un utilisateur par rapport à sont email
     * Utiliser lors de la connexion
     * 
     * @param  {string} username
     * @returns Promise
     */
    async loadUserByEmail(username: string): Promise<User | undefined> {
        return await UserRepository.getInstance(UserRepository).findByEmail(username);
    }
    /**
     * Recupere un utilisateur par rapport à l'email stocker dans
     * le JWT. Si le JWT est undefined alors retourne un AnonUser
     * Utiliser lors de n'import quel requete
     * 
     * @param  {string|undefined} jwt
     * @returns Promise
     */
    async refreshUser(jwt: string | undefined): Promise<UserInterface> {
        if (jwt === undefined) return this.getAnonUser();

        let decoded;
        try {
            decoded = JwtManager.Instance.decodeAndVerify(jwt);
        } catch (e) {
            return this.getAnonUser();
        }

        const user = await UserRepository.getInstance(UserRepository).findByEmail(decoded.email);

        if (!user) return this.getAnonUser();

        return user;
    }

    getAnonUser(): AnonUser {
        return new AnonUser();
    }
}
