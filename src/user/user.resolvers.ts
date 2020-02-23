import { IResolvers } from "apollo-server";
import { User } from "./entity/user.entity";
import { getManager } from "typeorm";

const users = [
    {id: 'to', firstname: 'toto'}
];


export const resolvers: IResolvers = {
    Query: {
        user: (_, args) => {
            const manager = getManager();
            const user = manager.getRepository(User).findOne({username: args.username});
            
            // const user = new User();
            // user.username = 'toto2';
            // const manager = getManager();
            // manager.save(user);

            return user;
         }
    },
    Mutation: {
        createUser: async (_, args) => {
            console.log('test mutation');
            const manager = getManager();
            const user = await manager.save(args.user);
            return user;
        }
    }
}