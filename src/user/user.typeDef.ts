import { gql } from "apollo-server";

export const typeDef = gql`
    extend type Query {
        user(username: String!): User
    }
    extend type Mutation {
        createUser(user: UserInput!): User
    }
    """
    Définition des utilisateur
    """
    type User {
        id: String!
        username: String
        firstname: String
        lastname: String
        email: String
    }

    input UserInput {
        username: String!
        firstname: String
        lastname: String
        email: String
    }

`;