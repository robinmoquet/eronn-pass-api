import {ApolloServer, IResolvers} from "apollo-server";

export default class Server {

    private readonly port: number;
    private readonly schema: any;

    constructor(schema: any, port: number) {
        this.schema = schema;
        this.port = port;
    }

    start() {
        const server = new ApolloServer({ schema: this.schema, tracing: true });

        server.listen().then(({ url }) => {
            console.log(`Server ready at ${url}`);
        });
    }
}
