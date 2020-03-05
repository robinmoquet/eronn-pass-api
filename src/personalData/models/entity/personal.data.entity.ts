import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, Column } from 'typeorm';
import { User } from '../../../user/models/entity/user.entity';
import { Address } from './address.entity';

@Entity()
export class PersonalData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'light-mode' })
    theme: string;

    @OneToOne(
        (type) => User,
        (user) => user.personalData
    )
    user: User;

    @OneToMany(
        (type) => Address,
        (address) => address.personalData,
        {
            cascade: true,
        }
    )
    address: Promise<Address[]>;
}
