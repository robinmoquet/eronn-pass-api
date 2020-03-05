import { ApolloServer, IResolvers, AuthenticationError } from 'apollo-server';
import { createConnection, Connection, EntityManager } from 'typeorm';
import { UserProvider } from './auth/user.provider';

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

    /**
     * Lance l'application sur le port spécifier dans la class
     *
     * @returns void
     */
    start(): void {
        this.runDefaultEnvConfig();

        const server = new ApolloServer({
            schema: this.schema,
            tracing: true,
            context: async ({ req }) => {
                const jwt: string | undefined = req.headers.authorization;

                const userProvider = new UserProvider();
                const user = await userProvider.refreshUser(jwt);

                return { user };
            },
        });

        server.listen(this.port).then(({ url }) => {
            console.log(`Server start to ${url}, good work and thinks async !`);
        });
    }

    /**
     * Permet de définir les paramètres d'environnement
     * par défault de l'application
     *
     * @returns void
     */
    runDefaultEnvConfig(): void {
        process.env.TZ = 'Europe/Amsterdam';
    }
}
