import React from "react";

const DormDetails = props => {

    return(
        <>
        <p><b>Dormity Name: </b>{props.dorm.name}</p>
        <p><b>Dormity Address: </b>{props.dorm.address}</p>
        </>
    );
};

export default DormDetails;