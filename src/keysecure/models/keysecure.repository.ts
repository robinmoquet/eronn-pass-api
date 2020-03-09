import { Keysecure } from "./keysecure.entity";
import { BaseRepository } from "../../common/repository/base.repository";
import { EntityRepository } from "typeorm";
import { KeysecureType } from "./keysecure.types.enum";
import KeysecureManager from "../keysecure.manager";
import { User } from "../../user/models/entity/user.entity";

@EntityRepository(Keysecure)
export class KeysecureRepository extends BaseRepository<Keysecure> {
    
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

    async findKeysecureByType(type: KeysecureType, key: string): Promise<Keysecure | null>
    {

        const keysecure = await this.createQueryBuilder("keysecure")
            .where("keysecure.key = :key", { key: key })
            .andWhere("keysecure.type = :type", { type: type })
            .getOne();

        if (keysecure === undefined) return null;
        return keysecure;
    }

}
