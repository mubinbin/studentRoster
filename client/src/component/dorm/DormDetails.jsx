import React, {useEffect, useState} from "react";
import axios from "axios";
// import DormDetailsShow from "./DormDetailsShow.jsx";

const DormDetails = props => {

    const [curDorm, setCurDorm] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/dorms/" + props.id)
        .then(res=>{
            console.log(here)
            setCurDorm(res.data);

            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting this dormity. Details: " + err)
        });

        return( ()=> {setCurDorm({});} );
    }, [isLoaded]);

    console.log(curDorm)

    return(
        <>

        </>
    );

};

export default DormDetails;