import { UserInterface } from './models/user.interface';

export interface AuthProviderInterface {

    loadUserByEmail(email: string): Promise<UserInterface | undefined>

    refreshUser(jwt: string): Promise<UserInterface>

}