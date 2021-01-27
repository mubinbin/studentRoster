import React from "react";
import {Link} from "@reach/router";
import "./DormDetailsShow.css";

const DormDetailsShow = props => {

    return(
        <>
        <p className="dorm-details-name"><b>Dormity Name: </b><Link to = {"/dorms/" + props.dorm.id}>{props.dorm.name}</Link></p>
        </>
    );
};

export default DormDetailsShow;