import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import './App.css';
import { List, Paper } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

const TodoItems = ({ items, deleteItem, update }) => {
  return <Paper style={{ margin: 16 }}>
    <List>
      {items.map((item, idx) =>
        <Todo
          item={item}
          key={item.id}
          deleteItem={deleteItem}
          update={update}
        />
      )}
    </List>
  </Paper>

};

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    call("/todo", "GET", null)
      .then(res => {
        setItems(res.data);
      })
  }, [])

  //추가
  const add = item => {
    call("/todo", "POST", item)
      .then(res => {
        setItems(res.data);
      });
  }
  //삭제
  const deleteItem = item => {
    call("/todo", "DELETE", item)
      .then(res => {
        setItems(res.data);
      })
  }
  //수정
  const update = item => {
    call("/todo", "PUT", item)
      .then(res => {
        setItems(res.data)
      })
  }

  return <div className="App">
    <AddTodo add={add} />
    <div className='TodoList'>
      {items.length > 0 &&
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((item, idx) =>
              <Todo
                item={item}
                key={item.id}
                deleteItem={deleteItem}
                update={update}
              />
            )}
          </List>
        </Paper>}
    </div>
  </div>
}

export default App;
