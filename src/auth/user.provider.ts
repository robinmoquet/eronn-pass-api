import { AuthProviderInterface } from "./auth.provider.interface";
import { UserInterface } from "./models/user.interface";
import { JwtManager } from "../security/jwt.manager";
import { UserRepository } from "../user/models/user.repository";
import { AnonUser } from "./models/anon.user";

export class UserProvider implements AuthProviderInterface {

    async loadUserByEmail(username: string): Promise<UserInterface | undefined>
    {
        return await UserRepository.Instance.findByEmail(username);
    }

    async refreshUser(jwt: string | undefined): Promise<UserInterface>
    {
        if (jwt === undefined) return this.getAnonUser();


        let decoded;
        try {
            decoded = JwtManager.Instance.decodeAndVerify(jwt);
        } catch(e) {
            return this.getAnonUser();
        }

        const user = await UserRepository.Instance.findByEmail(decoded.email);

        if (!user) return this.getAnonUser();

        return user;
    }

    getAnonUser(): AnonUser
    {
        return new AnonUser();
    }
}