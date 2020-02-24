import { UserInterface } from '../user/models/user.interface';

export interface AuthProviderInterface {

    // loadUserByEmail(email: string): UserInterface 

    refreshUser(jwt: string): UserInterface

}