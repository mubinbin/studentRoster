import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";

const DormForm = props =>{

    const [dorm, setDorm] = useState(props.initialState);

    const onChangeHandler = (e) => {
        setDorm({
            ...dorm,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.callBack(dorm);
        props.handleClose();
    };

    return(
        <form onSubmit = {onSubmitHandler}>

            <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Dormity Name"
            type="text"
            fullWidth
            value={dorm.name}
            onChange={onChangeHandler}
            />
            <br/>

            <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={dorm.address}
            onChange={onChangeHandler}
            />
            <br/>

            <div style={{padding:"15px 15px 15px 0"}}>
                <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
            </div>
        </form>
        
    );
};

export default DormForm;