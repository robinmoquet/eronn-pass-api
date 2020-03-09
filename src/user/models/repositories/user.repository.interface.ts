import { User } from '../entity/user.entity';
import { UserCreateDto } from '../user.create.dto';
import { FindOneOptions } from 'typeorm';
import { Keysecure } from '../../../keysecure/models/keysecure.entity';

export interface UserRepositoryInterface {
    createUser(userCreateDto: UserCreateDto): Promise<User | undefined>;

    saveUser(user: User): Promise<User | undefined>;

    findById(id: string): Promise<User | undefined>;

    findByEmail(email: string, options?: FindOneOptions): Promise<User | undefined>;

    addKeysecure(keysecure: Keysecure, user: User): Promise<void>;
}
