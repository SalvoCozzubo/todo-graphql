import React, { useState } from 'react';

const ListTodoView = (props) => {
  return (
    <>
      <div style={{ fontSize: 25 }}>Elementi totali: {props.totalRecords || 0}</div>
      <div>
        {
          props.todos.map((item) => (
            <Row key={item.ID} id={item.ID} text={item.text} />
          ))
        }
      </div>
      <div style={{ position: "relative", display: "flex" }}>
        <Paginator numPages={props.totalPages} currentPage={0} dispatch={props.listTodoFunc} />
      </div>
    </>
  )
};

const Row = ({ text, id }) => {
  return <div>{text} - <strong>{id}</strong></div>
};

const Paginator = ({ numPages, dispatch }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const changePage = (index) => {
    setCurrentPage(index);
    dispatch(index);
  };

  const rows = [];
  for (let index = 0; index < numPages; index += 1) {
    rows.push(
      <div
        style={{ padding: 8, fontSize: 20, fontWeight: currentPage === index ? "bold" : "normal", cursor: "pointer" }}
        key={`page-${index}`}
        onClick={(event) => changePage(index)}
      >
        {index}
      </div>
    );
  } 
  
  return rows;
};

export default ListTodoView;
