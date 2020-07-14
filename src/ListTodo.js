import React from 'react';

const ListTodoView = (props) => {
  return (
    <div>
      {
        props.todos.map((item) => (
          <div key={item.id}>{item.todo}</div>
        ))
      }
    </div>
  )
};

export default ListTodoView;
