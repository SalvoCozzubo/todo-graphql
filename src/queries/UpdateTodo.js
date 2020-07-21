import gql from 'graphql-tag';

const UpdateTodoMutation = gql`
  mutation updateTodo($updatetodoinput: UpdateTodoInput!) {
    updateTodo(input: $updatetodoinput) {
      ID
      text
      createdAt
      updatedAt
    }
  }
`;

export default UpdateTodoMutation;
