import { User } from '../entity/user.entity';
import { UserCreateDto } from '../user.create.dto';
import { FindOneOptions } from 'typeorm';

export interface UserRepositoryInterface {
    createUser(userCreateDto: UserCreateDto): Promise<User | undefined>;

    saveUser(user: User): Promise<User | undefined>;

    findById(id: string): Promise<User | undefined>;

    findByEmail(
        email: string,
        options?: FindOneOptions
    ): Promise<User | undefined>;
}
