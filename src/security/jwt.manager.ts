import { verify, sign } from "jsonwebtoken";
import { readFileSync } from "fs";
import { JwtPayloadInteface } from "./jwt.payload.interface";


export class JwtManager {
    
    private static _instance: JwtManager;

    private privateKeyPath: string;
    private publicKeyPath: string;

    private constructor()
    {
        this.privateKeyPath = '../../cert/jwtRSA256.key';
        this.publicKeyPath = '../../cert/jwtRSA256.key.pub';
    }

    public static get Instance(): JwtManager
    {
        if (!this._instance) this._instance = new JwtManager()
        return this._instance;
    }

    decodeAndVerify(token: string): JwtPayloadInteface
    {
        const certificate = readFileSync(this.publicKeyPath);
        
        let decoded;
        try {
            decoded = verify(token, certificate, { algorithms: ['RS256'] });
        } catch (err) {
            throw err;
        }

        console.log(decoded);
        return decoded as JwtPayloadInteface;
    }

    sign(payload: JwtPayloadInteface): string
    {
        const certificate = readFileSync(this.privateKeyPath);

        const token = sign(payload, certificate, { algorithm: 'RS256' });

        console.log(token);
        return token;
    }

}