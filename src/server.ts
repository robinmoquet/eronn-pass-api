import {ApolloServer} from "apollo-server";

export default class Server {

    readonly port: number;
    private typeDefs: any;
    private resolvers: any;

    constructor(typeDefs: any, resolvers: any, port: number) {
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this.port = port;
    }

    start() {
        const server = new ApolloServer({ typeDefs: this.typeDefs, resolvers: this.resolvers });

        server.listen().then(({ url }) => {
            console.log(`Server ready at ${url}`);
        });
    }
}
