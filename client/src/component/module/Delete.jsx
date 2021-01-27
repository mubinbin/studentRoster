import React from "react";
import axios from "axios";
import "./Delete.css";

const Delete = props => {

    const deleteEntry = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/api/${props.items}/${props.itemId}`)
        .then(res=>{
            props.callBack(props.itemId);
        })
        .catch(err=>{
            console.log(`Error on deleting entry. Details: ${err}`);
        });
    };

    return(
        <button onClick = {deleteEntry}>
            <i className="fas fa-trash-alt fa-lg"></i>
        </button>
    );
};

export default Delete;