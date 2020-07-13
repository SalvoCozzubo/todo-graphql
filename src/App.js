import React, { useReducer } from 'react';
import AddTodoForm from './AddTodoForm';
import ListTodo from './ListTodo';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const { payload } = action;
      console.log('payload', payload);
      state.todos = [...state.todos, payload];
      return { ...state };
    default:
      return { ...state };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  console.log('state', state);
  return (
    <>
      <h1>TODO</h1>
      <AddTodoForm dispatch={dispatch} />
      <ListTodo todos={state.todos} />
    </>
  );
}

export default App;
