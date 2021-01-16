import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";


const StudentForm = props => {

    const [student, setStudent] = useState(props.initialState);
    
    const onChangeHandler = e => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    };
    
    const onSubmitHandler = e => {
        e.preventDefault();
        props.callBack(student);
        props.handleClose();
    };

    return(
        <form onSubmit = {onSubmitHandler}>

            <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={student.firstName}
            onChange={onChangeHandler}
            />
            <br/>

            <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={student.lastName}
            onChange={onChangeHandler}
            />
            <br/>

            <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            min = "0"
            step = "1"
            fullWidth
            value={student.age}
            onChange={onChangeHandler}
            />
            <br/>


            <div style={{padding:"15px 15px 15px 0"}}>
                <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
            </div>
        </form>
    );
};

export default StudentForm;