import { IResolvers } from 'apollo-server';
import { UserRepository } from './models/repositories/user.repository';
import { UserCreateDto } from './models/user.create.dto';
import { PasswordManager } from '../security/password.manager';
import { UserInterface } from '../auth/models/user.interface';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../auth/models/role.enum';
import { EmailManager } from '../email/email.manager';

export const resolvers: IResolvers = {
    Query: {
        user: (_, { id }) => {
            return UserRepository.getInstance(UserRepository).findById(id);
        },
        userByEmail: (_, { email }, { user }: { user: UserInterface }) => {
            AuthGuard.isGranted(Role.ROLE_USER, user);

            return UserRepository.getInstance(UserRepository).findByEmail(
                email
            );
        },
    },
    Mutation: {
        createUser: async (_, { userDto }: { userDto: UserCreateDto }) => {
            userDto.password = await PasswordManager.Instance.hashUserPassword(
                userDto.password
            );

            const user = await UserRepository.getInstance(
                UserRepository
            ).createUser(userDto);
            if (user === undefined) throw new Error('Fail on save user');

            const res = await EmailManager.Gateway.sendConfirmationEmail({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
            // NOTE: on rentre jamais dans le if, car eronn-pass-mailer
            // retourne toujours success, on bloc pas le processu pour l'envoi
            // d'email
            if (res.status !== 'success') {
                throw new Error(res.message);
            }

            return user;
        },
    },
};
