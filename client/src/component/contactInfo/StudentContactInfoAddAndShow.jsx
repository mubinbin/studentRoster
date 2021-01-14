import React from "react";
import Modal from "../module/Modal.jsx";
import ContactInforDetails from "./ContactInfoDetails.jsx";

const StudentContactInfoAddAndShow = props => {
    
    return(
        <>
        <Modal
        action={props.isNew? "Add Contact Information" : "Update Contact Information"}
        modalTitle={props.isNew? "New Contact Information" : "Update Contact Information"}
        callBack={props.callBack}
        initialState={props.contactInfo}
        isNew={props.isNew}
        />
        {
            !props.isNew &&
            <ContactInforDetails contactIfo={props.contactInfo}/>
        }
        </>
    );

};

export default StudentContactInfoAddAndShow;