import React, { useReducer, useEffect, useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState('');

  const createTodo = async (todo) => {
    return await API.graphql(
      graphqlOperation(CreateTodoMutation, { createtodoinput: todo }));
  };

  useEffect(() => {
    const listTodo = async () => {
      let todos = [];
      try {
        const todosRaw = await API.graphql(graphqlOperation(ListTodoQuery));
        todos = todosRaw.data.listTodos.items ? todosRaw.data.listTodos.items : [];
      } catch (error) {
        setErrorMessage("Si è verificato un errore. Riprova.");
        console.error(error);
      }
      dispatch({ type: 'LOAD', payload: todos });
    };

    listTodo();
  }, []);

  return (
    <>
      <h1>TODO</h1>
      {errorMessage.length > 0 && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <AddTodoForm dispatch={dispatch} createTodo={createTodo} />
      <ListTodoView todos={state.todos} />
    </>
  );
}

export default App;
