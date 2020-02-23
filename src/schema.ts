import { makeExecutableSchema, gql } from "apollo-server";
import { merge } from "lodash";

// Import des TypeDef
// =======================================
import { typeDef as book } from './book/book.typeDef';
import{ typeDef as user } from './user/user.typeDef';


// Import des resolvers
// =======================================
import { resolvers as bookResolvers } from './book/book.resolvers';
import { resolvers as userResolvers } from './user/user.resolvers';


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
    typeDefs: [query, book, user],
    resolvers: merge(resolvers, bookResolvers, userResolvers)
});

export default schema;
