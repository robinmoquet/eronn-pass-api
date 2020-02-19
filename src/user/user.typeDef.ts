import { gql } from "apollo-server";

export const typeDef = gql`
    extend type Query {
        user(id: String!): User
    }
    """
    Définition des utilisateur
    """
    type User {
        id: String!
        firstname: String
    }
`;