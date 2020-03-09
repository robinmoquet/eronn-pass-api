import { UserRepositoryInterface } from './user.repository.interface';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../user.create.dto';
import { EntityRepository, FindOneOptions } from 'typeorm';
import { UserStats } from '../entity/user.stats.entity';
import { BaseRepository } from '../../../common/repository/base.repository';
import { PersonalData } from '../../../personalData/models/entity/personal.data.entity';
import { DataManager } from '../../../utils/DataManager';
import { Keysecure } from '../../../keysecure/models/keysecure.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    /**
     * Creer un nouvelle ustilisateur à partir du userDto
     *
     * @param  {UserCreateDto} userDto
     * @returns Promise
     */
    async createUser(userDto: UserCreateDto): Promise<User | undefined> {
        const user = await DataManager.handleDto<User>(userDto, new User());

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

    async findByEmail(email: string, options?: FindOneOptions): Promise<User | undefined> {
        return await this.findOne({ email }, options);
    }

    async findById(id: string): Promise<User | undefined> {
        return await this.findOne(id);
    }
    /**
     * Ajout un object keysure à un objet user
     * 
     * @param  {Keysecure} keysecure
     * @param  {User} user
     * @returns Promise
     */
    async addKeysecure(keysecure: Keysecure, user: User): Promise<void>
    {
        const prevKeysecure = await user.keysecures;
        user.keysecures = Promise.resolve([...prevKeysecure, keysecure]);

        this.flush(user);
    }
}
