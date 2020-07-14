import gql from 'graphql-tag';

const ListTodoView = gql`
  query listTodos {
    listTodos {
      items {
        id
        todo
      }
    }
  }
`;

export default ListTodoView;
