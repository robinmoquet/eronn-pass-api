import { makeExecutableSchema, gql } from 'apollo-server';
import { merge } from 'lodash';

// Import des TypeDef
// =======================================
import { typeDef as auth } from './auth/auth.typeDef';
import { typeDef as book } from './book/book.typeDef';
import { typeDef as user } from './user/user.typeDef';
import { typeDef as personalData } from './personalData/personalData.typeDef';

// Import des resolvers
// =======================================
import { resolvers as authResolvers } from './auth/auth.resolvers';
import { resolvers as bookResolvers } from './book/book.resolvers';
import { resolvers as userResolvers } from './user/user.resolvers';
import { resolvers as personalDataResolvers } from './personalData/personalData.resolvers';

const query = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

const resolvers = {};

const schema = makeExecutableSchema({
    typeDefs: [query, auth, book, user, personalData],
    resolvers: merge(
        resolvers,
        authResolvers,
        bookResolvers,
        userResolvers,
        personalDataResolvers
    ),
});

export default schema;
