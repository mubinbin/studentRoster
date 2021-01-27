import React from "react";
import "./ContactInfoDetails.css";

const StudentContactInforDetails = props => {

    return(
        <>
        <p className="home-address"><b>Home Address:</b> {props.contactIfo.homeAddress}</p>

        <div className="email-phone">
            <p id="email"><b>Email:</b> {props.contactIfo.email}</p>
            <p id="phone"><b>Phone:</b> {props.contactIfo.phone}</p>
        </div>
        </>
    );
};

export default StudentContactInforDetails;