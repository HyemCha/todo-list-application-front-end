import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import './App.css';
import { AppBar, Container, List, Paper, Toolbar, Typography, Grid, Button } from '@material-ui/core';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null)
      .then(res => {
        setItems(res.data);
        setLoading(false);
        console.log("loading", loading);
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

  let todoItems = items.length > 0 && (
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
    </Paper>
  );

  let navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography>
          </Grid>
          <Grid>
            <Button color="inherit" onClick={signout}>
              {'로그아웃'}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

  // 로딩 중이 아닐 때 렌더링할 부분
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  )

  // 로딩 중일 때 렌더링할 부분
  var loadingPage = <h1> 로딩 중.. </h1>

  var content = loadingPage;

  if(!loading){
    // 로딩 중이 아닐 때
    content = todoListPage;
  }

  // 선택한 content 렌더링
  return <div className='App'>{content}</div>
}

export default App;
