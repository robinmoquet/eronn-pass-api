import { gql } from "apollo-server";

export const typeDef = gql`
    extend type Query {
        connection(connectionDto: ConnectionInput!): ResultConnection
    }

    type ResultConnection {
        status: String!
        jwt: String
        message: String
    }

    input ConnectionInput {
        email: String!
        password: String!
    }
`;