import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";

const CourseForm = props => {

    const [course, setCourse] = useState(props.initialState);

    const onChangeHandler = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.callBack(course);
        props.handleClose();
    };

    return(
        <form onSubmit = {onSubmitHandler}>

            <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Course Name"
            type="text"
            fullWidth
            value={course.name}
            onChange={onChangeHandler}
            />
            <br/>

            <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={course.description}
            onChange={onChangeHandler}
            />
            <br/>

            <div style={{padding:"15px 15px 15px 0"}}>
                <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
            </div>
        </form>
        
    );
};

export default CourseForm;