import { UserStats } from "../entity/user.stats.entity";

export interface UserStatsRepositoryInterface {

    findById(id: string): Promise<UserStats>

}