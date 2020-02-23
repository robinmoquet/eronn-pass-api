import { gql } from "apollo-server";

export const typeDef = gql`
    extend type Query {
        user(id: String!): User
        userByEmail(email: String!): User
    }
    extend type Mutation {
        createUser(userDto: UserInput!): User
    }
    """
    Définition des utilisateur
    """
    type User {
        id: String!
        firstname: String!
        lastname: String!
        email: String!
        fullname: String!
    }

    input UserInput {
        firstname: String!
        lastname: String!
        email: String!
    }

`;