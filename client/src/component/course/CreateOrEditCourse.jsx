import React, {useState} from "react";
import axios from "axios";
import Modal from "../module/Modal.jsx";
import CourseForm from "../course/CourseForm.jsx";
import {navigate} from "@reach/router";


const CreateOrEditCourse = props => {

    const [newCourse, setNewCourse] = useState({
        name: "",
        description: ""
    });

    const addNewCourse = (course) => {
        axios.post("http://localhost:8080/api/courses/new", course)
        .then(res=>{
            navigate("/courses/" + res.data.id);
        })
        .catch(err=>{
            console.log("Error on adding new course. Details: " + err);
        });
    };

    const editCourse =(course) => {
        axios.patch("http://localhost:8080/api/courses/" + props.curCourse.id, course)
        .then(res=>{
            props.setCurCourse(res.data);
        })
        .catch(err=>{
            console.log("Error on editing course. Details: " + err);
        });
    };

    return(
        <>
        {
            props.curCourse?
            <>
                <Modal
                action = "Edit Course"
                modalTitle = "Edit Course"
                >
                    <CourseForm
                    initialState = {props.curCourse}
                    callBack = {editCourse}
                    btn = "Edit"
                    />
                </Modal>
            </>
            :
            <>
                <Modal
                action = "Add New Course"
                modalTitle = "Add New Course"
                >
                    <CourseForm
                    initialState = {newCourse}
                    callBack = {addNewCourse}
                    btn = "Add"
                    />
                </Modal>
            </>
        }
        </>
    );
}

export default CreateOrEditCourse;