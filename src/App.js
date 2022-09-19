import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import './App.css';
import { List, Paper } from '@material-ui/core';
import AddTodo from './AddTodo';

const TodoItems = ({items, deleteItem}) => {
  console.log("items",items)
  return<Paper style={{margin: 16}}>
    <List>
      {items.map((item, idx) => 
        <Todo item={item} key={item.id} deleteItem={deleteItem}/>
      )}
    </List>
  </Paper>
  
};

function App(){
  const [items, setItems] = useState(
      [{id:"0", title:"hello1", done:true},
      {id:"1", title:"hello2", done:false}]
      );

  useEffect(()=>{
    console.log()
  },[items])
  
  //추가
  const add = item =>{
    setItems([...items, {id:"ID-"+items.length, title:item.title, done:false}]);
  }
  //삭제
  const deleteItem = item => {
    const newItems = items.filter(i => i.id!=item.id)
    setItems(newItems);
  }

  console.log("items", items)
  return <div className="App">
    <AddTodo add={add}/>
    <div className='TodoList'>
      {items.length>0&&<TodoItems items={items}  deleteItem={deleteItem}/>}
    </div>
  </div>
}

export default App;
