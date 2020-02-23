import { User } from './user.entity';
import { UserCreateDto } from './user.create.dto';
import { UserRepository } from './user.repository';

export interface UserRepositoryInterface {

    Instance: UserRepository

    createUser(userCreateDto: UserCreateDto): Promise<User | undefined>

    saveUser(user: User): Promise<User | undefined>

    findById(id: string): Promise<User  | undefined>

    findByEmail(email: string): Promise<User  | undefined>
}