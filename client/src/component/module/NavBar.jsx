import React, {useState} from "react";
import {Link} from "@reach/router";


const NavBar = props =>{
    
    const initialStateBackground = {
        "1": {'backgroundColor':' rgba(71, 58, 58, 0.7)', 'color':'white'}, 
        "2": {}, 
        "3": {}
    };

    const initialStateColor = {
        "1": {'color':'white'}, 
        "2": {}, 
        "3": {}
    };

    const [clickBg, setClickBg] = useState(initialStateBackground);
    const [clickColor, setClickColor] = useState(initialStateColor)

    const onClickHandler = e =>{
        switch (e.target.name) {
            case "1":
                setClickBg(initialStateBackground);
                setClickColor(initialStateColor);
                break;
            case "2":
                setClickBg({
                    "2":{'backgroundColor':' rgba(71, 58, 58, 0.7)', 'color':'white'},
                    "1":{},
                    "3":{}
                });
                setClickColor({
                    "2":{'color':'white'},
                    "1":{},
                    "3":{}
                });
                break;
            case "3":
                setClickBg({
                    "3":{'backgroundColor':' rgba(71, 58, 58, 0.7)', 'color':'white'},
                    "1":{},
                    "2":{}
                });
                setClickColor({
                    "3":{'color':'white'},
                    "1":{},
                    "2":{}
                });
                break;
        }
    }

    return(
        <div className="nav-bar">
            <div 
            style={ clickBg["1"] } 
            className="show-all-info"
            >
            <i className="fas fa-user-graduate fa-sm"></i> <Link style={clickColor["1"]} onClick={onClickHandler} name="1" to="/">All Students</Link></div>
            
            <div
            style={ clickBg["2"] }
            className="show-all-info"><i className="fas fa-bed fa-sm"></i> <Link style={clickColor["2"]} onClick={onClickHandler} name="2" to="/dorms">All Dormities</Link></div>
        
            <div
            style={ clickBg["3"] }
            className="show-all-info"><i className="fas fa-chalkboard-teacher fa-sm"></i> <Link style={clickColor["3"]} onClick={onClickHandler} name="3" to="/courses">All Classes</Link></div>
        {props.children}
    </div>
    );  
};

export default NavBar;