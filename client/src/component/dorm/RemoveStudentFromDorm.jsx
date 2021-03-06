import React from "react";
import axios from "axios";

const RemoveStudentFromDorm = props => {
    
    const removeStudentFromDorm = e => {
        e.preventDefault();
        axios.get("http://localhost:8080/api/dorms/removestudent/" + props.studentId)
        .then(res=>{
            props.updateDom(res.data);
        })
        .catch(err=>{
            console.log("Error on removing student from dorm. Details: " + err);
        });
    };
    
    return(
        <button style={{"marginLeft":"10px"}} onClick = {removeStudentFromDorm}>
            REMOVE
        </button>
    );
};

export default RemoveStudentFromDorm;