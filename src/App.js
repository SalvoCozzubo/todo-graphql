import React, { useReducer, useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import DetailView from './DetailView';
import ListTodoView from './ListTodo';
import ListTodoQuery from './queries/ListTodo';
import CreateTodoMutation from './queries/CreateTodo';
import { API, graphqlOperation } from 'aws-amplify';

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD':
      state.todos = [...state.todos, payload];
      return { ...state };
    case 'LOAD':
      console.log('payload', payload);
      const { todos, totalPages, totalRecords } = payload;
      state.todos = [...todos];
      state.totalPages = totalPages;
      state.totalRecords = totalRecords;
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

  const listTodo = async (currentPage = 0) => {
    let todos = [];
    let totalPages = 0;
    let totalRecords = 0;

    try {
      const todosRaw = await API.graphql(
        graphqlOperation(ListTodoQuery, { page: currentPage }));
      todos = todosRaw.data.listTodos.items ? todosRaw.data.listTodos.items : [];
      totalPages = todosRaw.data.listTodos.totalPages || 0;
      totalRecords = todosRaw.data.listTodos.totalRecords || 0;
      console.log('todo raw', todosRaw);
    } catch (error) {
      setErrorMessage("Si è verificato un errore. Riprova.");
      console.error(error);
    }
    dispatch({ type: 'LOAD', payload: { todos, totalPages, totalRecords } });
  };

  useEffect(() => {
    listTodo();
  }, []);

  return (
    <>
      <h1>TODO</h1>
      {errorMessage.length > 0 && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <AddTodoForm dispatch={dispatch} createTodo={createTodo} />
      <ListTodoView
        todos={state.todos}
        totalPages={state.totalPages}
        listTodoFunc={listTodo}
        totalRecords={state.totalRecords}
      />
      <DetailView />
    </>
  );
}

export default App;
