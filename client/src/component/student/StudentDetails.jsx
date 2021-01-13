import React, {useState, useEffect} from "react";
import axios from "axios";
import StudentContactInfoAddAndShow from "../contactInfo/StudentContactInfoAddAndShow.jsx";
import DormDetails from "../dorm/DormDetails.jsx";
import SelectDormForm from "../dorm/SelectDormForm.jsx";

const StudentDetails = props =>{

    const [curStudent, setCurStudent] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [contactinfo, setContactinfo] = useState({});
    const [dorm, setDorm] = useState({})
    const [newContactInfo, setNewContactInfo] = useState({
        homeAddress: "",
        email:  "",
        phone: "",
    });

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    useEffect(()=>{

        // get current student
        axios.get("http://localhost:8080/api/students/" + props.id)
        .then(res => {
            setCurStudent(res.data);

            // get student contact info
            setContactinfo(res.data.contactinfo);

            // get student dorm
            setDorm(res.data.dorm)

            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting current sutdent. Details: " + err);
        });

        return ()=>{ setCurStudent({}); setContactinfo({}); }
    }, [isLoaded, props.id]);

    // update contact info
    const updateContactInfo = (updatedContactInfo) => {

        axios.patch("http://localhost:8080/api/students/" + props.id + "/contactinfos/" + contactinfo.id, updatedContactInfo, {headers:{
            "Content-Type":"application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        }})

        .then(res=> {
            setCurStudent(res.data);
            setIsLoaded(false);
        })
        .catch(err =>{
            console.log("Error on updating contact infomation. Details: " + err);
        });
    };

    // add new contact infomation
    const addContactInfo = (updatedContactInfo) => {

        axios.post("http://localhost:8080/api/students/" + props.id + "/contactinfos", updatedContactInfo, {headers:{
            "Content-Type":"application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        }})
        .then(res=> {
            setCurStudent(res.data);
            setIsLoaded(false);
        })
        .catch(err =>{
            console.log("Error on creating new contact infomation. Details: " + err);
        });
    };

    // assign dorm to student
    const assignDorm = (selectedDorm) => {
        axios.post("http://localhost:8080/api/students/" + props.id + "/dorms", selectedDorm, {headers:{
            "Content-Type":"application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        }})
        .then(res=>{
            setDorm(res.data);
            setIsLoaded(false);
        })
        .catch(err=>{
            console.log("Error on assigning dorm. Details: " + err);
        });
    };

    return(
        <>
        {
            
            isLoaded && (
            <>
            <h1>{curStudent.firstName} {curStudent.lastName}</h1>
            <p><b>Age: </b>{curStudent.age}</p>
            
            <hr/>
            <h3>Contact Information</h3>
            {
                contactinfo?
                    <StudentContactInfoAddAndShow 
                    isNew={false} 
                    callBack={updateContactInfo} 
                    contactInfo={contactinfo}
                    />
                    :
                    <StudentContactInfoAddAndShow 
                    isNew={true}
                    callBack={addContactInfo} 
                    contactInfo={newContactInfo}
                    />
            }

            <hr/>
            <h3>Dormity Information</h3>
            { dorm && <DormDetails dorm={dorm} /> }
            
            <SelectDormForm callBack = {assignDorm} dorm={dorm}/>

            <hr/>
            <h3>Enrolled Classes</h3>

            </>
            )
        }
        </>
    );
}

export default StudentDetails;