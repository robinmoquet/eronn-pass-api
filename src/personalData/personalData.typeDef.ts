import { gql } from 'apollo-server';

export const typeDef = gql`
    extend type Query {
        personalData: PersonalData
    }
    extend type Mutation {
        addAddress(addressDto: InputAddress): Address
    }

    """
    Définition des donées personnel
    """
    type PersonalData {
        theme: String!
        address: [Address]
    }

    type Address {
        city: String!
        zipCode: String!
        country: String!
        address: String!
    }

    input InputAddress {
        city: String!
        zipCode: String!
        country: String!
        address: String!
    }
`;
