import { UserRepositoryInterface } from "./user.repository.interface";
import { User } from "./user.entity";
import { UserCreateDto } from "./user.create.dto";
import { Repository, EntityRepository, getCustomRepository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements UserRepositoryInterface {
    
    Instance: UserRepository;

    public static get Instance()
    {
        return getCustomRepository(UserRepository);
    }

    async createUser(userDto: UserCreateDto): Promise<User | undefined>
    {
        const user = new User();
        user.email = userDto.email;
        user.firstname = userDto.firstname;
        user.lastname = userDto.lastname;
        user.password = userDto.password;

        return await this.save(user);
    }

    async saveUser(user: User): Promise<User | undefined>
    {
        return await this.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined>
    {
        return await this.findOne({email});
    }

    async findById(id: string): Promise<User | undefined>
    {
        return await this.findOne(id);
    }

}