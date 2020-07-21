import gql from 'graphql-tag';

const DeleteTodoMutation = gql`
  mutation createTodo($deletetodoinput: DeleteTodoInput!) {
    deleteTodo(input: $deletetodoinput) {
      ID
    }
  }
`;

export default DeleteTodoMutation;
