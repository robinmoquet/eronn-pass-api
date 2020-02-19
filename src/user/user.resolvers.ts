import { IResolvers, IResolverOptions } from "apollo-server";

const users = [
    {id: 'to', firstname: 'toto'}
];

export const resolvers: IResolvers = {
    Query: {
        user: (_, args) => { return users.find(user => user.id === args.id) }
    }
}