import { IResolvers } from "apollo-server";
import { UserRepository } from "./models/user.repository";
import { UserCreateDto } from "./models/user.create.dto";
import { PasswordManager } from "../security/password.manager";


export const resolvers: IResolvers = {
    Query: {
        user: (_, { id }) => {
            return UserRepository.Instance.findById(id);
        },
         userByEmail: (_, { email }) => {
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