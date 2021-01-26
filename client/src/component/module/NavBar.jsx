import React from "react";
import {Link} from "@reach/router";

const NavBar = props =>{
    return(
        <div className="nav-bar">

            <div className="show-all-info"><i class="fas fa-user-graduate fa-sm"></i> <Link to="/">All Students</Link></div>
            
            <div className="show-all-info fa-sm"><i class="fas fa-bed"></i> <Link to="/dorms">All Dormities</Link></div>
            
            <div className="show-all-info"><i class="fas fa-chalkboard-teacher fa-sm"></i> <Link to="/courses">All Classes</Link></div>
            {props.children}
        </div>
    );  
};

export default NavBar;