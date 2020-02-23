import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {

    @ObjectIdColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    get fullname (): string
    {
        return `${this.firstname} ${this.lastname}`;
    }
}