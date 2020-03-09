import { Keysecure } from "./models/keysecure.entity";
import { KeysecureType } from "./models/keysecure.types.enum";

class KeysecureManager {

    static keysecureLength: number = 68;
    static keysecureChar: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    static generateKeysecure(): string
    {
        let charLength = KeysecureManager.keysecureChar.length;
        let res: string = '';
        for (let i = 0; i < KeysecureManager.keysecureLength; i++) {
            res += KeysecureManager.keysecureChar.charAt(Math.floor(Math.random() * charLength));
        }
        return res;
    }
    /**
     * Control si un object keysecure est valid
     * 
     * @param  {Keysecure} keysecure
     * @param  {KeysecureType} type
     * @returns boolean
     */
    static verify(keysecure: Keysecure, type: KeysecureType): boolean
    {
        if (keysecure.expireAt === null) return true;
        const now = new Date();
        return now < keysecure.expireAt;
    }

}

export default KeysecureManager;