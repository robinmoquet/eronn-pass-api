import { gql } from "apollo-server";

export const typeDef = gql`
    """
    Définition des types de response
    """
    type Response {
        code: Number!
        status: String!
    }
`;