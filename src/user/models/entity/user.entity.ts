import {
    Entity,
    Column,
    ObjectIdColumn,
    OneToOne,
    JoinColumn,
    ObjectID,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm';
import { UserInterface } from '../../../auth/models/user.interface';
import { Role } from '../../../auth/models/role.enum';
import { UserStats } from './user.stats.entity';
import { PersonalData } from '../../../personalData/models/entity/personal.data.entity';
import { type } from 'os';

@Entity()
export class User implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @OneToOne(
        (type) => UserStats,
        (userStats) => userStats.user,
        {
            cascade: true,
        }
    )
    @JoinColumn()
    userStats: Promise<UserStats>;

    @OneToOne(
        (type) => PersonalData,
        (personalData) => personalData.user,
        {
            cascade: true,
        }
    )
    @JoinColumn()
    personalData: Promise<PersonalData>;

    get fullname(): string {
        return `${this.firstname} ${this.lastname}`;
    }

    getUsername(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return Role.ROLE_USER;
    }
}
