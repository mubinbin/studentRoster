import React, {useState, useEffect} from "react";
import axios from "axios";
import StudentContactInfoAdd from "../contactInfo/StudentContactInfoAdd.jsx";
import StudentContactInfoShow from "../contactInfo/StudentContactInfoShow.jsx";

const StudentDetails = props =>{

    const [curStudent, setCurStudent] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [contactinfo, setContactinfo] = useState([]);
    

    useEffect(()=>{

        // get current student
        axios.get("http://localhost:8080/api/students/" + props.id)
        .then(res => {
            setCurStudent(res.data);

            // get current student's contact info
            axios.get("http://localhost:8080/api/students/" + props.id + "/contactinfo")
            .then(res => {
                setContactinfo(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log("Error getting current student's contact infomation. Details: " + err);
            });
        })
        .catch(err=>{
            console.log("Error getting current sutdent. Details: " + err);
        });

        return ()=>{ setCurStudent({}); setContactinfo({}); }
    }, [isLoaded, props.id]);

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
                    <StudentContactInfoShow curContactInfo={contactinfo}></StudentContactInfoShow>
                    :
                    <StudentContactInfoAdd></StudentContactInfoAdd>
            }
            
            
            

            <hr/>
            <h3>Dormity Information</h3>



            <hr/>
            <h3>Enrolled Classes</h3>

            </>
            )


        }

        </>

    )
}

export default StudentDetails;