import gql from 'graphql-tag';

const CreateTodoMutation = gql`
  mutation createTodo($createtodoinput: CreateTodoInput!) {
    createTodo(input: $createtodoinput) {
      ID
      text
    }
  }
`;

export default CreateTodoMutation;
