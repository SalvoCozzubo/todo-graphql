import gql from 'graphql-tag';

const CreateTodo = gql`
  mutation createPost($input: CreateTodoInput!) {
    createPost(input: $input) {
      id
      todo
    }
  }
`;

export default CreateTodo;
