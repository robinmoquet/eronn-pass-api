import { gql } from 'apollo-server';

export const typeDef = gql`
    extend type Query {
        books: [Book]
    }
    """
    Feature d'exemple au niveau de l'architecture
    """
    type Book {
        title: String
        author: String
    }
`;
