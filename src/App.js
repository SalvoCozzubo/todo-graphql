import React, { useReducer, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import ListTodoView from './ListTodo';
import ListTodoQuery from './queries/ListTodo';
import CreateTodoMutation from './queries/CreateTodo';
import { API, graphqlOperation } from 'aws-amplify';

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD':
      // TODO: stare attenti alle copie
      state.todos = [...state.todos, payload];
      return { ...state };
    case 'LOAD':
      state.todos = [...payload];
      return { ...state };
    default:
      return { ...state };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  const createTodo = async (todo) => {
    return await API.graphql(
      graphqlOperation(CreateTodoMutation, { createtodoinput: todo }));
  };

  useEffect(() => { 
    const listTodo = async () => {
      const todosRaw = await API.graphql(graphqlOperation(ListTodoQuery));
      const todos = todosRaw.data.listTodos ? todosRaw.data.listTodos.items : [];
      dispatch({ type: 'LOAD', payload: todos });
    };
    
    listTodo();
  }, []);

  return (
    <>
      <h1>TODO</h1>
      <AddTodoForm dispatch={dispatch} createTodo={createTodo} />
      <ListTodoView todos={state.todos} />
    </>
  );
}

export default App;
