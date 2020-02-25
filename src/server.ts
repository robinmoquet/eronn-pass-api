import {ApolloServer, IResolvers, AuthenticationError} from "apollo-server";
import { createConnection, Connection, EntityManager } from "typeorm";
import { UserProvider } from "./auth/user.provider";

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
        const server = new ApolloServer({
            schema: this.schema,
            tracing: true,
            context: async ({ req }) => {
                const jwt: string | undefined = req.headers.authorization;

                const userProvider = new UserProvider();
                const user = await userProvider.refreshUser(jwt);

                return { user };
            }
        });

        server.listen().then(({ url }) => {
            console.log(`Server ready to ${url}`);
        });
    }
}
