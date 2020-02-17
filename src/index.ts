import Server from './server';
import { gql } from 'apollo-server';


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

// Data
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// Resolvers
const resolvers = {
    Query: {
        books: () => books,
    },
};


// lance le server node
const server = new Server(typeDefs, resolvers, 4000);
server.start();
