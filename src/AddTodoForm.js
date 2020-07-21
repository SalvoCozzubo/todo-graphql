import React, { useState } from 'react';

const AddTodoForm = ({ dispatch, createTodo }) => {
  const [formState, setFormState] = useState('');
  
  const addTodo = async () => {
    const result = await createTodo({ text: formState });

    const todoServer = result.data.createTodo;
    console.log('result', result);

    dispatch({
      type: 'ADD',
      payload: todoServer,
    });
    
    setFormState(''); // reset the state
  };

  const onKeyInput = async (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div>
      <input
        onChange={event => setFormState(event.target.value)}
        placeholder="Write a todo.."
        value={formState}
        style={styles.input}
        onKeyPress={onKeyInput}
      />
      <button
        onClick={addTodo}>Add Todo</button>
    </div>
    
  )
};

const styles = {
  input: { margin: 8, fontSize: 24 },
};

export default AddTodoForm;
