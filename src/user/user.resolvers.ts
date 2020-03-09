import { IResolvers } from 'apollo-server';
import { UserRepository } from './models/repositories/user.repository';
import { UserCreateDto } from './models/user.create.dto';
import { PasswordManager } from '../security/password.manager';
import { UserInterface } from '../auth/models/user.interface';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../auth/models/role.enum';
import { EmailManager } from '../email/email.manager';
import Status from '../response/models/status.enum';
import Response from '../response/models/response.model';
import KeysecureManager from '../keysecure/keysecure.manager';
import { KeysecureRepository } from '../keysecure/models/keysecure.repository';
import { KeysecureType } from '../keysecure/models/keysecure.types.enum';
import { UserStatsRepository } from './models/repositories/user.stats.repository';

export const resolvers: IResolvers = {
    Query: {
        user: (_, { id }) => {
            return UserRepository.getInstance(UserRepository).findById(id);
        },
        userByEmail: (_, { email }, { user }: { user: UserInterface }) => {
            AuthGuard.isGranted(Role.ROLE_USER, user);

            return UserRepository.getInstance(UserRepository).findByEmail(email);
        },
        /**
         * Renvoi l'email pour la confirmation de l'email
         * Rest la keysecure associé à cette action
         * 
         * @param  {} _
         * @param  {{email:string}} {email}
         */
        sendAgainEmailForConfirmation: async (_, { email }: { email: string }) => {
            const response = new Response(Status.ERROR);

            const user = await UserRepository.getInstance(UserRepository).findByEmail(email);
            if (user === undefined) {
                response.message = 'Email not valid';
                return response;
            }

            const keysecureRepo = KeysecureRepository.getInstance(KeysecureRepository);
            const oldKeysecure = await keysecureRepo.getKeysecureForConfirmationByEmail(user.id);
            if (oldKeysecure !== undefined) keysecureRepo.remove(oldKeysecure);

            const keysecure = await keysecureRepo.createKeysecureForConfirmEmail(user);
            if (keysecure === undefined) {
                response.message = 'Error during save new keysecure';
                return response;
            }
            // on attend pas que l'email soit envoyer pour
            // retourner une réponse à l'utilisateur
            EmailManager.Gateway.sendConfirmationEmail({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                keysecure: keysecure.key
            });

            response.status = Status.SUCCESS;
            return response;
        },
    },
    Mutation: {
        /**
         * Permet de creer un utilisateur + envoi un mail de validation
         * 
         * @param  {} _
         * @param  {{userDto:UserCreateDto}} {userDto}
         */
        createUser: async (_, { userDto }: { userDto: UserCreateDto }) => {
            userDto.password = await PasswordManager.Instance.hashUserPassword(userDto.password);

            const userRepository = UserRepository.getInstance(UserRepository)
            const user = await userRepository.createUser(userDto);
            if (user === undefined) throw new Error('Fail on save user');

            let keysecure = KeysecureRepository.getInstance(KeysecureRepository).createKeysecureForConfirmEmail(user);
            // userRepository.addKeysecure(keysecure, user);

            const res = await EmailManager.Gateway.sendConfirmationEmail({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                keysecure: keysecure.key
            });
            // NOTE: on rentre jamais dans le if, car eronn-pass-mailer
            // retourne toujours success, on bloc pas le processu pour l'envoi
            // d'email
            if (res.status !== 'success') {
                throw new Error(res.message);
            }

            return user;
        },
        /**
         * Method appeler pour confirmer l'email d'un user
         * 
         * @param  {} _
         * @param  {{key:string}} {key}
         */
        confirmationEmail: async (_, { key }: { key: string }) => {
            const response = new Response();

            const keysecureRepo = KeysecureRepository.getInstance(KeysecureRepository);
            let keysecure = await keysecureRepo.findKeysecureByType(KeysecureType.CONFIRM_EMAIL, key);
            
            if (keysecure === null) {
                response.status = Status.ERROR;
                response.message = 'keysecure not found';
                return response;
            }

            const emailIsConfirm = KeysecureManager.verify(keysecure, KeysecureType.CONFIRM_EMAIL);

            if (!emailIsConfirm) {
                response.status = Status.ERROR;
                response.message = 'this keysecure is expire';
                return response;
            }

            const user = await keysecure.user;
            const userStats = await user.userStats;
            userStats.confirmEmailAt = new Date();
            UserStatsRepository.getInstance(UserStatsRepository).flush(userStats);
            keysecureRepo.remove(keysecure);

            response.status = Status.SUCCESS
            return response;
        }
    },
};
