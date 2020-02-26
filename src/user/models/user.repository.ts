import { UserRepositoryInterface } from "./user.repository.interface";
import { User } from "./entity/user.entity";
import { UserCreateDto } from "./user.create.dto";
import { Repository, EntityRepository, getCustomRepository, FindOneOptions } from "typeorm";
import { MonitoringConnection } from "./entity/monitoring.connection.entity";

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

        const monitoringConnection: MonitoringConnection = new MonitoringConnection();
        monitoringConnection.createAt = new Date();

        user.monitoringConnection = monitoringConnection;


        return await this.save(user);
    }

    async saveUser(user: User): Promise<User | undefined>
    {
        return await this.save(user);
    }

    async findByEmail(email: string, options?: FindOneOptions): Promise<User | undefined>
    {
        const user = await this.findOne({email}, options);
        console.log(user?.monitoringConnection);
        return user;
    }

    async findById(id: string): Promise<User | undefined>
    {
        return await this.findOne(id);
    }

}