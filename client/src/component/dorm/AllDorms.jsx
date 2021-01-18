import React, {useEffect, useState} from "react";
import axios from "axios";
import DormTable from "./DormTable.jsx";

const AllDorms = props => {

    const [allDorms, setAllDorms] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/dorms")
        .then(res=>{
            setAllDorms(res.data);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting all dormities. Details: " + err);
        });

        return ( () => {setAllDorms([])} )
    }, [isLoaded])

    return(
        <>
        {
            isLoaded &&
                <DormTable data= {allDorms}/>
        }
        </>
    );
};

export default AllDorms;