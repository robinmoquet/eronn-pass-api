import { Keysecure } from "./keysecure.entity";
import { BaseRepository } from "../../common/repository/base.repository";
import { EntityRepository } from "typeorm";
import { KeysecureType } from "./keysecure.types.enum";
import KeysecureManager from "../keysecure.manager";
import { User } from "../../user/models/entity/user.entity";

@EntityRepository(Keysecure)
export class KeysecureRepository extends BaseRepository<Keysecure> {
    
    /**
     * Creer et persiste une keysecure pour la confirmation de 
     * l'addresse email d'un user
     * 
     * @param  {User} user
     * @returns Keysecure
     */
    createKeysecureForConfirmEmail(user: User): Keysecure
    {
        const keysecure = new Keysecure();
        keysecure.type = KeysecureType.CONFIRM_EMAIL;
        keysecure.key = KeysecureManager.generateKeysecure();
        keysecure.createAt = new Date();
        keysecure.user = Promise.resolve(user);
        // keysecure.expireAt = new Date();

        this.flush(keysecure);
        return keysecure;
    }
    /**
     * Trouve une keysecure par rapport à un type et une key
     * 
     * @param  {KeysecureType} type
     * @param  {string} key
     * @returns Promise
     */
    async findKeysecureByType(type: KeysecureType, key: string): Promise<Keysecure | null>
    {

        const keysecure = await this.createQueryBuilder("keysecure")
            .where("keysecure.key = :key", { key: key })
            .andWhere("keysecure.type = :type", { type: type })
            .getOne();

        if (keysecure === undefined) return null;
        return keysecure;
    }
    /**
     * Retourne la keysecure pour la confirmation de l'email
     * par rapport à l'utilisateur passer en params
     * 
     * @param  {User} userId
     * @returns Promise
     */
    async getKeysecureForConfirmationByEmail(userId: string): Promise<Keysecure | undefined>
    {
        return await this.createQueryBuilder('keysecure')
            .where("keysecure.userId = :userId", { userId: userId })
            .andWhere("keysecure.type = :type", { type: KeysecureType.CONFIRM_EMAIL })
            .getOne();
    }

}
