import "reflect-metadata";
import {createConnection} from "typeorm";
import Server from './server';
import schema from './schema';

// lance le server node
const server = new Server(schema, 4000);
server.createConnectionDatabase();
server.start();