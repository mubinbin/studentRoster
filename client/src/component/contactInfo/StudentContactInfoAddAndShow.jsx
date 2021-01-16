import React from "react";
import Modal from "../module/Modal.jsx";
import ContactInfoDetails from "./ContactInfoDetails.jsx";
import ContactInfoForm from "./ContactInfoForm.jsx";


const StudentContactInfoAddAndShow = props => {
    
    return(
        <>
        <Modal
        action={props.isNew? "Add Contact Information" : "Update Contact Information"}
        modalTitle={props.isNew? "New Contact Information" : "Update Contact Information"}
        >
            <ContactInfoForm
            btn={props.isNew? "Add Contact Information" : "Update Contact Information"}
            initialState={props.contactInfo}
            callBack={props.callBack}
            isNew={props.isNew}
            />
        </Modal>

        {
            !props.isNew &&
            <ContactInfoDetails contactIfo={props.contactInfo}/>
        }
        </>
    );

};

export default StudentContactInfoAddAndShow;