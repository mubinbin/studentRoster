import React from "react";

const StudentContactInforDetails = props => {

    return(
        <>
        <p><b>Home Address:</b> {props.contactIfo.homeAddress}</p>
        <p><b>Email:</b> {props.contactIfo.email}</p>
        <p><b>Phone:</b> {props.contactIfo.phone}</p>
        </>
    );
};

export default StudentContactInforDetails;