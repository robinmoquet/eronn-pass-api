import { AuthProviderInterface } from "./auth.provider.interface";
import { UserInterface } from "../user/models/user.interface";
import { JwtManager } from "../security/jwt.manager";
import { UserRepository } from "../user/models/user.repository";
import { AuthenticationError } from "apollo-server";

export class UserProvider implements AuthProviderInterface {

    // loadUserByEmail(username: string): UserInterface
    // {
    //     // TODO
    // }

    async refreshUser(jwt: string): Promise<UserInterface | undefined>
    {
        try {
            const decoded = JwtManager.Instance.decodeAndVerify(jwt);
            const user = await UserRepository.Instance.findByEmail(decoded.email);
            return user;
        } catch (e) {
            throw e;
        }
    }
}