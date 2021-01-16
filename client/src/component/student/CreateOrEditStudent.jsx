import Modal  from "../module/Modal";
import React, {useState} from "react";
import StudentForm from "./StudentForm";
import axios from "axios";
import {navigate} from "@reach/router";


const CreateOrEditStudent = props =>{

    const [newStudent, setNewStudent] = useState({
        firstName: "",
        lastName: "",
        age: 0
    });


    const addNewStudent = (student) => {
        console.log(student);
        axios.post("http://localhost:8080/api/students/new", student)
        .then(res=>{
            navigate(`/students/${res.data.id}`);
        })
        .catch(err=>{
            console.log("Error on adding student. Details: " + err);
        });
        console.log()
    };

    const editStudent = (student) => {
        
        axios.patch("http://localhost:8080/api/students/edit/" + props.curStudent.id, student)
        .then(res=>{
            props.setCurStudent(res.data);
        })
        .catch(err=>{
            console.log("Error on editing student. Details: " + err);
        });
    };

    return(
        <>
        {
            props.curStudent?
            <>
                <Modal
                action = "Edit Student"
                modalTitle = "Edit Student"
                >
                    <StudentForm 
                    initialState = {props.curStudent}
                    callBack = {editStudent}
                    btn = "Edit"
                    />
                </Modal>
            </>
                :
            <>
                <Modal
                action = "Add New Student"
                modalTitle = "Add New Student"
                >
                    <StudentForm 
                    initialState = {newStudent}
                    callBack = {addNewStudent}
                    btn = "Add"
                    />
                </Modal>
            </>
        }
        </>
    );
}

export default CreateOrEditStudent;