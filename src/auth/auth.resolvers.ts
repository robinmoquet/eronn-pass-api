import { IResolvers } from 'apollo-server';
import { ConnectionDto } from './models/connection.dto';
import { ConnectionResult } from './models/connection.result';
import { UserProvider } from './user.provider';
import { Status } from './models/connection.result.interface';
import { UserChecker } from './user.checker';
import { JwtManager } from '../security/jwt.manager';
import { UserAuthPayloadInterface } from '../security/jwt.paypload/user.auth.payload.interface';

export const resolvers: IResolvers = {
    Query: {
        connection: async (_, { connectionDto }: { connectionDto: ConnectionDto }) => {
            const res = new ConnectionResult();
            const userProvider = new UserProvider();
            const userChecker = new UserChecker();

            let user = await userProvider.loadUserByEmail(connectionDto.email);

            if (user === undefined) {
                return definedResForError(res, 'Invalid email');
            }

            try {
                await userChecker.preCheck(user, connectionDto);
                await userChecker.check(user, connectionDto);
                await userChecker.postCheck(user, connectionDto);
            } catch (e) {
                return definedResForError(res, e.message);
            }

            const payload: UserAuthPayloadInterface = {
                email: user.getUsername(),
            };

            const jwt = JwtManager.Instance.sign(payload);

            res.status = Status.SUCCESS;
            res.message = 'Success authenticate';
            res.jwt = jwt;

            return res;
        },
    },
};

function definedResForError(res: ConnectionResult, message: string): ConnectionResult {
    res.status = Status.ERRORR;
    res.message = message;
    return res;
}
