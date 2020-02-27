import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserStats {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => User, user => user.userStats)
    user: User;

    @Column({default: 0})
    connectionAttempt: number;

    @Column()
    createAt: Date;

    @Column({default: false})
    isLock: boolean;

    @Column({ nullable: true })
    lockedAt?: Date;
    
}