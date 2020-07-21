import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import GetTodoQuery from './queries/GetTodo';
import UpdateTodoMutation from './queries/UpdateTodo';

const DetailView = () => {
  const [currentTodo, setCurrentTodo] = useState(undefined);
  const [formState, setFormState] = useState('');
  const [todoState, setTodoState] = useState('');

  const getTodo = async (id) => {
    const todoRaw = await API.graphql(
      graphqlOperation(GetTodoQuery, { id }));

    setCurrentTodo(todoRaw.data.getTodo);
  };

  const onKeyInput = async (event) => {
    if (event.key === "Enter") {
      getTodo(formState);
    }
  };

  useEffect(() => {
    if (currentTodo === undefined) return;
    setTodoState(currentTodo.text);
  }, [currentTodo]);

  const updateTodo = async () => {
    const { ID } = currentTodo;
    console.log('ID', ID);
    const todoRaw = await API.graphql(
      graphqlOperation(UpdateTodoMutation, 
        { updatetodoinput: { ID, text: todoState }}));

    console.log('t', todoRaw);
  };

  return (
    <div>
      <input
        onChange={event => setFormState(event.target.value)}
        placeholder="Search an ID"
        value={formState}
        style={styles.input}
        onKeyPress={onKeyInput}
      />
      {
        currentTodo &&
          <>
            <div>ID: {currentTodo.ID}</div>
            <div>CreatedAt: {currentTodo.createdAt}</div>
            <div>UpdatedAt: {currentTodo.updatedAt}</div>
            <div>
              <input
                onChange={event => setTodoState(event.target.value)}
                value={todoState} />
            </div>
            <div>
              <button
                onClick={updateTodo}>Update</button>
            </div>
          </>
      }
    </div>
  );
};

const styles = {
  input: { margin: 8, fontSize: 24, width: 500 },
};

export default DetailView;
