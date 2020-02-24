import { IResolvers } from "apollo-server";
import { UserRepository } from "./models/user.repository";


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
        createUser: async (_, { userDto }) => {
            return UserRepository.Instance.createUser(userDto);
        }
    }
}