import React from "react";
import axios from "axios";

const RemoveCourseStudent = props =>{

    const onClickHandler = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/api/courses/removestudent/${props.studentId}/${props.courseId}`)
        .then(res=>{
            console.log("Successfully remove student form course");
            if(props.fromStudentDetails){
                props.updateDom(props.courseId);
            }else{
                props.updateDom(props.studentId)
            }
        })
        .catch(err=>{
            console.log("Error on removing student form course. Details: " + err);
        })
    };

    return(
        <div>
            <button onClick={onClickHandler}>
                {props.fromStudentDetails? "Drop Course" : "Remove Student"}
            </button>
        </div>

    );
};

export default RemoveCourseStudent;