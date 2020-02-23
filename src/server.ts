import {ApolloServer, IResolvers} from "apollo-server";
import { createConnection, Connection, EntityManager } from "typeorm";

export default class Server {

    private readonly port: number;
    private readonly schema: any;

    constructor(schema: any, port: number) {
        this.schema = schema;
        this.port = port;
    }

    async createConnectionDatabase() {
        const connection: Connection = await createConnection();
    }

    start() {
        const server = new ApolloServer({ schema: this.schema, tracing: true });

        server.listen().then(({ url }) => {
            console.log(`Server ready to ${url}`);
        });
    }
}
