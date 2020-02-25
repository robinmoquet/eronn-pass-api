import { hash, genSaltSync, compare } from "bcryptjs";

export class PasswordManager {
    private static _instance: PasswordManager;

    private readonly salt: string;

    private constructor()
    {
        
        this.salt = genSaltSync(10);
    }

    public static get Instance(): PasswordManager
    {
        if (!this._instance) this._instance = new PasswordManager()
        return this._instance;
    }


    async hashUserPassword(plainPassword: string): Promise<string>
    {
        return await hash(plainPassword, this.salt);
    }

    async comparePassword(plainPassword: string, hash: string): Promise<boolean>
    {
        return await compare(plainPassword, hash);
    }

}