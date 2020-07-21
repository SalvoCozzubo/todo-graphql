import React from 'react';

const ListTodoView = (props) => {
  return (
    <div>
      {
        props.todos.map((item) => (
          <div key={item.ID}>{item.text}</div>
        ))
      }
    </div>
  )
};

export default ListTodoView;
