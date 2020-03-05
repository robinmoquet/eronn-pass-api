import { AuthCheckerInterface } from './auth.checker.interface';
import { UserInterface } from './models/user.interface';
import { PasswordManager } from '../security/password.manager';
import { ConnectionDto } from './models/connection.dto';
import { User } from '../user/models/entity/user.entity';
import { UserStatsRepository } from '../user/models/repositories/user.stats.repository';

/**
 * Control si le user peu ce connecter
 *
 * @class UserChecker
 */
export class UserChecker implements AuthCheckerInterface {
    /**
     * Control sur le user avant l'auth
     *
     * @param  {User} user
     * @param  {ConnectionDto} connectionDto
     * @returns Promise
     */
    async preCheck(user: User, connectionDto: ConnectionDto): Promise<void> {
        let accountIsLocked = false;
        const userStats = await user.userStats;

        // si le compte n'est pas bloqué on return
        if (!userStats.isLock) return;

        const now = new Date();
        const dateToUnlock = new Date(userStats.lockedAt as Date);

        if (userStats.connectionAttempt > 6)
            dateToUnlock.setHours(dateToUnlock.getHours() + 1);
        else if (userStats.connectionAttempt >= 5)
            dateToUnlock.setMinutes(dateToUnlock.getMinutes() + 10);
        else if (userStats.connectionAttempt >= 3)
            dateToUnlock.setMinutes(dateToUnlock.getMinutes() + 1);

        if (now < dateToUnlock) accountIsLocked = true;

        if (accountIsLocked) {
            throw new Error('This compte is locked');
        }
    }

    /**
     * @param  {User} user
     * @param  {ConnectionDto} connectionDto
     * @returns Promise
     */
    async check(user: User, connectionDto: ConnectionDto): Promise<void> {
        const password = user.getPassword();
        let samePassword = await PasswordManager.Instance.comparePassword(
            connectionDto.password,
            password
        );

        if (!samePassword) {
            const userStats = await user.userStats;
            userStats.connectionAttempt = userStats.connectionAttempt + 1;

            if (userStats.connectionAttempt >= 3) {
                userStats.isLock = true;
                userStats.lockedAt = new Date();
            }

            UserStatsRepository.getInstance(UserStatsRepository).flush(
                userStats
            );

            throw new Error('Invalid password');
        }
    }

    /**
     * Si l'utilisateur c'est correctement connecter
     * on reset les control liée au nombre d'essaye de connection
     *
     * @param  {User} user
     * @param  {ConnectionDto} connectionDto
     * @returns Promise
     */
    async postCheck(user: User, connectionDto: ConnectionDto): Promise<void> {
        const userStats = await user.userStats;

        if (!userStats.isLock) return;

        userStats.connectionAttempt = 0;
        userStats.isLock = false;
        userStats.lockedAt = null;

        UserStatsRepository.getInstance(UserStatsRepository).flush(userStats);
    }
}
