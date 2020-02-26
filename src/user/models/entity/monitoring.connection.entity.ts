import { Entity, JoinColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MonitoringConnection {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    user: User;

    @Column()
    connectionAttempt: number = 0;

    @Column()
    createAt: Date;
    
}