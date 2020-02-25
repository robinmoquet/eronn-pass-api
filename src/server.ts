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
            context: ({ req }) => {
                const jwt: string | undefined = req.headers.authorization;
                console.log(jwt)
                
                if (jwt === undefined) {
                    throw new AuthenticationError('User not provide');
                }

                const userProvider = new UserProvider();

                try {
                    const user = userProvider.refreshUser(jwt);

                    if (!user) throw new AuthenticationError('User not provide');

                    return { user };
                } catch (e) {
                    throw new AuthenticationError('Authentication error');;
                }
            }
        });

        server.listen().then(({ url }) => {
            console.log(`Server ready to ${url}`);
        });
    }
}
