import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserInterface } from '../../../auth/models/user.interface';
import { Role } from '../../../auth/models/role.enum';
import { UserStats } from './user.stats.entity';
import { PersonalData } from '../../../personalData/models/entity/personal.data.entity';
import { type } from 'os';
import { Keysecure } from '../../../keysecure/models/keysecure.entity';
import { IsString, Length } from 'class-validator/decorator/decorators';

@Entity()
export class User implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @Length(3, 40)
    firstname: string;

    @Column()
    @IsString()
    @Length(3, 40)
    lastname: string;

    @Column({
        unique: true,
    })
    @IsString()
    @Length(3, 60)
    email: string;

    @Column()
    @IsString()
    @Length(3, 150)
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

    @OneToMany(
        (type) => Keysecure,
        (keysecure) => keysecure.user,
        {
            cascade: true,
            onDelete: "CASCADE"
        }
    )
    keysecures: Promise<Keysecure[]>;

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
