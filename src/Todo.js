import { Checkbox, IconButton, InputBase, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Todo (props){
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    const deleteEventHandler = () => {
        props.deleteItem(item)
    }
    
    const offReadOnlyMode = () => {
        setReadOnly(false);
    }

    const enterKeyEventHandler = e => {
        if (e.key == "Enter"){
            setReadOnly(true);
            props.update(item);
        }
    }

    const checkboxEventHandler = e => {
        const updateItem = {...item, done:!item.done}
        setItem({...item, done : !item.done})
        props.update(updateItem);
        console.log("update after checkbox clicked", e.target.checked,item)
    }

    const editEventHandler = e => {
        setItem({...item, title : e.target.value});
    }

    return(
        <ListItem>
            <Checkbox 
                checked={item.done} 
                onChange={checkboxEventHandler}/>
            <ListItemText>
                <InputBase
                    inputProps={{
                        "aria-label" : "naked",
                        readOnly : readOnly
                    }}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    onClick={offReadOnlyMode}
                    onKeyDown={enterKeyEventHandler}
                    onChange={editEventHandler}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton 
                    aria-label='Delete Todo'
                    onClick={deleteEventHandler}>
                    <DeleteOutlineIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Todo;