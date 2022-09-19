import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const AddTodo = ({add}) => {
    const [item, setItem] = useState({ title: '' });
    const onInputChange = e => {
        setItem({ title: e.target.value });
        console.log("item", item)
    }
    const onButtonClick = () => {
        add(item);
        setItem({title:""});
    }
    const enterKeyEventHandler = e => {
        if(e.key === 'Enter')
            onButtonClick();
    }
    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
                <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                    <TextField
                        placholder="Add Todo here"
                        fullWidth
                        onChange={onInputChange}
                        value={item.title}
                        onKeyPress={enterKeyEventHandler} />
                </Grid>
                <Grid xs={1} md={1} item>
                    <Button fullWidth 
                        color="secondary" 
                        variant="outlined"
                        onClick={onButtonClick}>
                        +
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AddTodo;