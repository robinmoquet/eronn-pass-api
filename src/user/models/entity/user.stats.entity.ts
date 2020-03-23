import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserStats {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(
        (type) => User,
        (user) => user.userStats,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn()
    user: User;

    @Column({ default: 0 })
    connectionAttempt: number;

    @Column()
    createAt: Date;

    @Column({ default: 0 })
    isLock: boolean;

    @Column({ nullable: true, type: Date })
    lockedAt?: Date | null;

    @Column({ nullable: true, type: Date })
    confirmEmailAt?: Date | null;
}
