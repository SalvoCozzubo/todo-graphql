import React from 'react';

const ListTodo = (props) => {
  console.log('ListTodo', props);
  return (
    <div>
      {
        props.todos.map((item, index) => (
          <div key={index}>{item}</div>
        ))
      }
    </div>
  )
};

export default ListTodo;