import { Repository, EntityRepository } from 'typeorm';
import { UserStats } from '../entity/user.stats.entity';
import { UserStatsRepositoryInterface } from './user.stats.repository.interface';
import { BaseRepository } from '../../../common/repository/base.repository';

@EntityRepository(UserStats)
export class UserStatsRepository extends BaseRepository<UserStats> implements UserStatsRepositoryInterface {
    async findById(id: string): Promise<UserStats> {
        const userStats = await this.findOne(id);

        if (userStats === undefined) throw new Error(`No user stats found for this id : ${id}`);
        return userStats;
    }
}
