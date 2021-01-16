import React from "react";
import {Link} from "@reach/router";

const NavBar = props =>{
    return(
        <div>
            <Link to="/">All Students</Link> | <Link to="#">All Dormities</Link> | <Link to="#">All Classes</Link>
            {props.children}
        </div>
    );  
};

export default NavBar;