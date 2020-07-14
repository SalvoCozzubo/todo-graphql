import gql from 'graphql-tag';

const CreateTodoMutation = gql`
  mutation createTodo($createtodoinput: CreateTodoInput!) {
    createTodo(input: $createtodoinput) {
      id
      todo
    }
  }
`;

export default CreateTodoMutation;
