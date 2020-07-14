import React, { useReducer } from 'react';
import AddTodoForm from './AddTodoForm';
import ListTodoView from './ListTodo';
import ListTodoQuery from './queries/ListTodo';
import CreateTodoMutation from './queries/CreateTodo';
import { graphql, compose } from 'react-apollo'
import { graphqlMutation } from 'aws-appsync-react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const { payload } = action;
      state.todos = [...state.todos, payload];
      return { ...state };
    default:
      return { ...state };
  }
};

const App = ({ todos, createTodo }) => {
  const [state, dispatch] = useReducer(reducer, { todos });
  console.log('props', createTodo);

  return (
    <>
      <h1>TODO</h1>
      <AddTodoForm dispatch={dispatch} createTodo={createTodo} />
      <ListTodoView todos={state.todos} />
    </>
  );
}

export default compose(
  graphql(ListTodoQuery, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      todos: props.data.listTodos ? props.data.listTodos.items : [],
    })
  }),
  graphqlMutation(CreateTodoMutation, ListTodoQuery, 'Todo'))
  (App);
