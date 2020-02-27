import { Entity, Column, ObjectIdColumn, OneToOne, JoinColumn, ObjectID, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { UserInterface } from '../../../auth/models/user.interface';
import { Role } from '../../../auth/models/role.enum';
import { UserStats } from './user.stats.entity';

@Entity()
export class User implements UserInterface {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => UserStats, userStats => userStats.user, {
        cascade: true
    })
    @JoinColumn()
    userStats: Promise<UserStats>;

    get fullname (): string
    {
        return `${this.firstname} ${this.lastname}`;
    }

    getUsername(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }

    getRoles(): Array<Role>
    {
        return [Role.ROLE_USER];
    }
}