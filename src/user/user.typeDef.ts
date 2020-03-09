import { gql } from 'apollo-server';

export const typeDef = gql`
    extend type Query {
        user(id: String!): User
        userByEmail(email: String!): User
        sendAgainEmailForConfirmation(email: String!): resendConfirmationEmailResponse
    }
    extend type Mutation {
        createUser(userDto: UserInput!): User
        confirmationEmail(key: String!): ConfirmationEmailResponse
    }

    """
    Définition des utilisateur
    """
    type ConfirmationEmailResponse implements Response {
        status: Status!
        message: String
    }

    type resendConfirmationEmailResponse implements Response {
        status: Status!
        message: String
    }

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
        password: String!
    }
`;
