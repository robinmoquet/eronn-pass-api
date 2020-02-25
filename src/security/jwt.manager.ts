import { verify, sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import { UserAuthPayloadInterface } from "./jwt.paypload/user.auth.payload.interface";
import { AuthenticationError } from "apollo-server";


export class JwtManager {
    
    private static _instance: JwtManager;

    private privateKeyPath: string;
    private publicKeyPath: string;

    private constructor()
    {
        this.privateKeyPath = 'cert/jwtRS256.key';
        this.publicKeyPath = 'cert/jwtRS256.key.pub';
    }

    public static get Instance(): JwtManager
    {
        if (!this._instance) this._instance = new JwtManager()
        return this._instance;
    }

    decodeAndVerify(token: string): UserAuthPayloadInterface
    {
        const certificate = readFileSync(this.publicKeyPath);
        
        let decoded;
        try {
            decoded = verify(token, certificate, { algorithms: ['RS256'] });
        } catch (err) {
            throw new AuthenticationError('jwt not valid');
        }

        console.log(decoded);
        return decoded as UserAuthPayloadInterface;
    }

    sign(payload: UserAuthPayloadInterface): string
    {
        const certificate = readFileSync(this.privateKeyPath);

        const token = sign(payload, certificate, { algorithm: 'RS256' });

        console.log(token);
        return token;
    }

}