import React from "react";
import Modal from "../module/Modal.jsx";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const StudentContactInfoShow = props => {
    
    return(
        <>
        <Modal
        action="Update Contact Information"
        modalTitle="Update Contact Information"
        updateContactInfo={props.updateContactInfo}
        initialState={props.curContactInfo}
        />
        <p><b>Home Address:</b> {props.curContactInfo.homeAddress}</p>
        <p><b>Email:</b> {props.curContactInfo.email}</p>
        <p><b>Phone:</b> {props.curContactInfo.phone}</p>
        </>
    );

};

export default StudentContactInfoShow;