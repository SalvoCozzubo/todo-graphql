import React, { useState } from 'react';

const AddTodoForm = ({ dispatch, createTodo }) => {
  const [formState, setFormState] = useState('');
  
  const addTodo = async () => {
    // use props for update list todos
    const todo = { todo: formState };
    
    const result = await createTodo({ createtodoinput: todo });

    const todoServer = result.data.createTodo;
    console.log('result', result);

    dispatch({
      type: 'ADD',
      payload: todoServer,
    });
    
    setFormState(''); // reset the state
  };

  return (
    <div>
      <input
        onChange={event => setFormState(event.target.value)}
        placeholder="Write a todo.."
        value={formState}
      />
      <button
        onClick={addTodo}>Add Todo</button>
    </div>
    
  )
};

export default AddTodoForm;
