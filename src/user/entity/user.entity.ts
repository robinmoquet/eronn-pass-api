import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {

    @ObjectIdColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    firstname?: string;

    @Column()
    lastname?: string;

    @Column()
    email?: string;
}