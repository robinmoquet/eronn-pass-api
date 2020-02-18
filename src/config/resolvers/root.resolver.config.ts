import BookResolver from '../../resolvers/book.resolver';

// Resolvers
const resolvers = {
    Query: {
        books: (...params: any) => (new BookResolver()).books(params),
    },
};

export default resolvers;