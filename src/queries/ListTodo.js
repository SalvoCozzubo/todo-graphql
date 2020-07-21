import gql from 'graphql-tag';

const ListTodoQuery = gql`
  query listTodos($page: Int) {
    listTodos(page: $page) {
      items {
        ID
        text
      }
      totalPages
      totalRecords
    }
  }
`;

export default ListTodoQuery;
