import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddTodoForm = (props) => {
  const [formState, setFormState] = useState('');
  
  const addTodo = async () => {
    // use props for update list todos
    props.dispatch({
      type: 'ADD',
      payload: {
        todo: formState, id: uuidv4()
      }
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
