import React, {useEffect, useState} from "react";
import axios from "axios";
import DormDetailsShow from "./DormDetailsShow";
import CreateOrEditDorm from "./CreateOrEditDorm.jsx";

const DormDetails = props => {

    const [curDorm, setCurDorm] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/dorms/" + props.id)
        .then(res=>{
            setCurDorm(res.data);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on geting dorm information. Details: " + err);
        });

        return( ()=> {setCurDorm({});} );
    }, [isLoaded]);


    return(
        <>
        {
            isLoaded && 
                <>
                <DormDetailsShow dorm = {curDorm} />
                <CreateOrEditDorm  
                curDorm = {curDorm} 
                setCurDorm = {setCurDorm}
                />
                </>
        }
        </>
    );

};

export default DormDetails;