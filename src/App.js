import React, { useReducer } from 'react';
import AddTodoForm from './AddTodoForm';
import ListTodoView from './ListTodo';
import ListTodoQuery from './queries/ListTodo';
import { graphql } from 'react-apollo'

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

const App = ({todos}) => {
  const [state, dispatch] = useReducer(reducer, { todos });

  console.log('props', todos);
  return (
    <>
      <h1>TODO</h1>
      <AddTodoForm dispatch={dispatch} />
      <ListTodoView todos={state.todos} />
    </>
  );
}

export default graphql(ListTodoQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: props => ({
    todos: props.data.listTodos ? props.data.listTodos.items : [],
  })
})(App);
