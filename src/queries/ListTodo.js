import gql from 'graphql-tag';

const ListTodoView = gql`
  query listTodos {
    listTodos {
      items {
        ID
        text
      }
    }
  }
`;

export default ListTodoView;
