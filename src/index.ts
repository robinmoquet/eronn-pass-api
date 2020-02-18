import Server from './server';
import { gql } from 'apollo-server';
import resolvers from './config/resolvers/root.resolver.config';


// TypeDefs
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  
  type Query {
    books: [Book]
  }
`;



// lance le server node
const server = new Server(typeDefs, resolvers, 4000);
server.start();
