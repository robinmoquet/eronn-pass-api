import { IResolvers } from "apollo-server";
import { UserRepository } from "./models/user.repository";
import { UserCreateDto } from "./models/user.create.dto";
import { PasswordManager } from "../security/password.manager";
import { UserInterface } from "../auth/models/user.interface";


export const resolvers: IResolvers = {
    Query: {
        user: (_, { id }) => {
            return UserRepository.Instance.findById(id);
        },
        userByEmail: (_, { email }, { user }: { user: UserInterface }) => {

            // console.log('=============================');
            // console.log(user.getUsername());

            return UserRepository.Instance.findByEmail(email);
        }
    },
    Mutation: {
        createUser: async (_, { userDto }: {userDto: UserCreateDto}) => {
            userDto.password = await PasswordManager.Instance.hashUserPassword(userDto.password);
            return UserRepository.Instance.createUser(userDto);
        }
    }
}