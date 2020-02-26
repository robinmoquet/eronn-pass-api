import { IResolvers } from 'apollo-server';

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

export const resolvers: IResolvers = {
    Query: {
        books: () => books,
    },
};
