import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from "../module/Modal.jsx";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const StudentContactInfoShow = props => {
    // console.log(props.curContactInfo)
    const [curContactInfo, setCurContactInfo] = useState(props.curContactInfo);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        // setCurContactInfo(props.curContactInfo)
        setIsLoaded(true);
    }, [isLoaded]);

    const updateContactInfo = (contactInfo) => {

        axios.patch("http://localhost:8080/api/contactinfos/" + props.curContactInfo.id, contactInfo, {headers:{
            "Content-Type":"application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        }})

        .then(()=> {

            axios.get(proxyurl+"http://localhost:8080/api/contactinfos/" + contactInfo.id)

            .then(res=>{
                console.log("here")
                setCurContactInfo(res.data);
                setIsLoaded(false);
            })
        })
        .catch(err =>{
            console.log(err);
        });
    };
    console.log(isLoaded)
    console.log(curContactInfo)
    
    return(
        <>
        {
            isLoaded?
            <>
            <Modal
            action="Update Contact Information"
            modalTitle="Update Contact Information"
            updateContactInfo={updateContactInfo}
            initialState={props.curContactInfo}
            />
            <p><b>Home Address:</b> {curContactInfo.homeAddress}</p>
            <p><b>Email:</b> {curContactInfo.email}</p>
            <p><b>Phone:</b> {curContactInfo.phone}</p>
            </>
            :
            <div></div>
        }
        
        </>
    );

};

export default StudentContactInfoShow;