import React from "react";
import axios from "axios";

const RemoveStudentFromDorm = props => {
    
    const removeStudentFromDorm = e => {
        e.preventDefault();
        axios.get("http://localhost:8080/api/dorms/removestudent/" + props.studentId)
        .then(res=>{
            props.updateDom(props.studentId);
        })
        .catch(err=>{
            console.log("Error on removing student from dorm. Details: " + err);
        });
    };
    
    return(
        <button onClick = {removeStudentFromDorm}>
            Remove
        </button>
    );
};

export default RemoveStudentFromDorm;