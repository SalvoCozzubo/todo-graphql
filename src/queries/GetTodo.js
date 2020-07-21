import gql from 'graphql-tag';

const GetTodoQuery = gql`
  query getTodo($id: ID!) {
    getTodo(id: $id) {
      ID
      text
      createdAt
      updatedAt
    }
  }
`;

export default GetTodoQuery;
