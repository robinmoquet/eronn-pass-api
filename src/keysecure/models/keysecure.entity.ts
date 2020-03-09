import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../user/models/entity/user.entity";
import { userInfo } from "os";
import { KeysecureType } from "./keysecure.types.enum";

@Entity()
export class Keysecure {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    key: string;

    @Column()
    type: KeysecureType;

    @Column()
    createAt: Date;

    @Column({ nullable: true, type: Date })
    expireAt: Date | null;

    @ManyToOne(
        (type) => User,
        (user) => user.keysecures
    )
    user: Promise<User>;

}