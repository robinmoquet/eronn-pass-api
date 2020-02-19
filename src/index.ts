import Server from './server';
import schema from './schema';


// lance le server node
const server = new Server(schema, 4000);
server.start();
