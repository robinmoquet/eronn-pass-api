import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { UserInterface } from './user.interface';
import { Role } from '../../auth/role.enum';

@Entity()
export class User implements UserInterface {

    @ObjectIdColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    get fullname (): string
    {
        return `${this.firstname} ${this.lastname}`;
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