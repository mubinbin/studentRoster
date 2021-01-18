import React, {useState} from "react";
import axios from "axios";
import Modal from "../module/Modal.jsx";
import DormForm from "../dorm/DormForm.jsx";
import {navigate} from "@reach/router";

const CreateOrEditDorm = props => {

    const [newDorm, setNewDorm] = useState({
        name: "",
        address: ""
    });

    const addNewDorm = (dorm) =>{
        axios.post("http://localhost:8080/api/dorms/new", dorm)
        .then(res=>{
            navigate("/dorms");
        })
        .catch(err=>{
            console.log("Error on creating new dorm . Details: " + err);
        })

    };

    const editDorm = (dorm) =>{
        axios.patch("http://localhost:8080/api/dorms/" + props.curDorm.id, dorm)
        .then(res=>{
            props.setcurDorm(res.data);
        })
        .catch(err=>{
            console.log("Error on editing dorm . Details: " + err);
        })
    };

    return(
        <>
        {
            props.curDorm?
            <>
                <Modal
                action = "Edit Dorm"
                modalTitile = "Eidt Dorm" 
                >
                    <DormForm
                    initialState = {props.curDorm}
                    callBack = {editDorm}
                    btn = "Edit"
                    />
                </Modal>
            </>
                :
            <>
                <Modal
                action = "Create New Dorm"
                modalTitile = "Create New Dorm" 
                >
                    <DormForm
                    initialState = {newDorm}
                    callBack = {addNewDorm}
                    btn = "Add"
                    />
                </Modal>
            </>
        }
        </>
    );
};

export default CreateOrEditDorm;