import { UserRepositoryInterface } from './user.repository.interface';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../user.create.dto';
import {
    Repository,
    EntityRepository,
    getCustomRepository,
    FindOneOptions,
} from 'typeorm';
import { UserStats } from '../entity/user.stats.entity';
import { BaseRepository } from '../../../common/repository/base.repository';
import { PersonalData } from '../../../personalData/models/entity/personal.data.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User>
    implements UserRepositoryInterface {
    async createUser(userDto: UserCreateDto): Promise<User | undefined> {
        const user = new User();
        user.email = userDto.email;
        user.firstname = userDto.firstname;
        user.lastname = userDto.lastname;
        user.password = userDto.password;

        const userStats: UserStats = new UserStats();
        userStats.createAt = new Date();
        user.userStats = Promise.resolve(userStats);

        const personalData: PersonalData = new PersonalData();
        user.personalData = Promise.resolve(personalData);

        return await this.save(user);
    }

    async saveUser(user: User): Promise<User | undefined> {
        return await this.save(user);
    }

    async findByEmail(
        email: string,
        options?: FindOneOptions
    ): Promise<User | undefined> {
        return await this.findOne({ email }, options);
    }

    async findById(id: string): Promise<User | undefined> {
        return await this.findOne(id);
    }
}
