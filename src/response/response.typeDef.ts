import { gql } from 'apollo-server';

export const typeDef = gql`
    """
    Définition des response
    """
    enum Status {
        success
        error
    }

    interface Response {
        status: Status!
        message: String
    }
`;
