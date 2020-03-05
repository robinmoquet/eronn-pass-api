import { IResolvers } from 'apollo-server';
import { UserInterface } from '../auth/models/user.interface';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../auth/models/role.enum';
import { User } from '../user/models/entity/user.entity';
import { AddressDto } from './models/dto/address.dto';
import { Address } from './models/entity/address.entity';
import { PersonalDataRepository } from './models/repositories/personalData.repository';
import { AuthGuardError } from '../auth/guards/auth.guard.error';

export const resolvers: IResolvers = {
    Query: {
        personalData: async (_, __, { user }: { user: UserInterface }) => {
            AuthGuard.isGranted(Role.ROLE_USER, user);
            if (user instanceof User) {
            } else {
                throw new Error('This user in not type "User"');
            }

            const personalData = await user.personalData;
            const address = await personalData.address;
            console.log(address);

            return personalData;
        },
    },
    Mutation: {
        addAddress: async (
            _,
            { addressDto }: { addressDto: AddressDto },
            { user }: { user: UserInterface }
        ) => {
            AuthGuard.isGranted(Role.ROLE_USER, user);
            if (user instanceof User) {
            } else {
                throw new Error('This user in not type "User"');
            }

            const personalData = await user.personalData;

            // FIXEME: A refactor
            const address = new Address();
            address.city = addressDto.city;
            address.zipCode = addressDto.zipCode;
            address.country = addressDto.country;
            address.address = addressDto.address;

            const prevAddress = await personalData.address;
            personalData.address = Promise.resolve([...prevAddress, address]);
            PersonalDataRepository.getInstance(PersonalDataRepository).flush(
                personalData
            );

            return address;
        },
    },
};
