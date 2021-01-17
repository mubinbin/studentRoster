import React from "react";

const DormDetailsShow = props => {

    return(
        <>
        <p><b>Dormity Name: </b>{props.dorm.name}</p>
        <p><b>Dormity Address: </b>{props.dorm.address}</p>
        </>
    );
};

export default DormDetailsShow;