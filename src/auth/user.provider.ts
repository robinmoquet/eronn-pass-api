import { AuthProviderInterface } from "./auth.provider.interface";
import { UserInterface } from "../user/models/user.interface";

export class UserProvider implements AuthProviderInterface {

    // loadUserByEmail(username: string): UserInterface
    // {
    //     // TODO
    // }

    refreshUser(jwt: string): UserInterface
    {
        // TODO
    }

}