import React, {useState, useEffect} from "react";
import axios from "axios";
import StudentContactInfoAddAndShow from "../contactInfo/StudentContactInfoAddAndShow.jsx";
import DormDetailsShow from "../dorm/DormDetailsShow.jsx";
import SelectDormForm from "../dorm/SelectDormForm.jsx";
import {Link, navigate} from "@reach/router";
import RemoveCourseStudent from "../course/RemoveCourseStudent.jsx";
import AvailableCourses from "../course/AvailableCourses.jsx";
import CreateOrEditStudent from "./CreateOrEditStudent.jsx";
import Paper from '@material-ui/core/Paper';
import "./StudentDetails.css";
import IconButton from '@material-ui/core/IconButton';

const StudentDetails = props =>{

    const [curStudent, setCurStudent] = useState({});
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [contactinfo, setContactinfo] = useState({});
    const [dorm, setDorm] = useState({})
    const [newContactInfo, setNewContactInfo] = useState({
        homeAddress: "",
        email:  "",
        phone: "",
    });

    useEffect(()=>{

        // get current student
        axios.get("http://localhost:8080/api/students/" + props.id)
        .then(res => {
            setCurStudent(res.data);

            // get student contact info
            setContactinfo(res.data.contactinfo);

            // get student dorm
            setDorm(res.data.dorm);

            // get student enrolling courses
            setEnrolledCourses(res.data.courses);

            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting current sutdent. Details: " + err);
        });

        // get unerolled courses
        axios.get("http://localhost:8080/api/courses/students/" + props.id)
        .then(res=>{
            setAvailableCourses(res.data);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting available courses. Details: " + err);
        });

        return ()=>{ setCurStudent({}); setContactinfo({}); setDorm({}); setAvailableCourses([]); }
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
    const assignDorm = (curStudent) => {
        axios.put("http://localhost:8080/api/students/" + props.id + "/dorms", curStudent)
        .then(res=>{
            setDorm(res.data);
            setIsLoaded(false);
        })
        .catch(err=>{
            console.log("Error on assigning dorm. Details: " + err);
        });
    };

    // update enrolledCourses and availableCourses
    const updateDom = (courseRemoved) =>{
        setEnrolledCourses(enrolledCourses.filter(course => course.id !== courseRemoved.id));
        setAvailableCourses([...availableCourses, courseRemoved])
    };

    // delete this student
    const deleteStudent = (e) => {
        e.preventDefault();
        axios.delete("http://localhost:8080/api/students/" + props.id)
        .then(()=>{
            navigate("/");
        })
        .catch(err=>{
            console.log("Error on deleting student. Details: " + err);
        });
    };

    return(
        <Paper id="student-details-paper" elevation={5}>
        {
            
            isLoaded && (
            <>
            <h2>Student Details: </h2>

            <div className="name">
                <h2>{curStudent.firstName} {curStudent.lastName}</h2>
                <p><b>Age: </b>{curStudent.age}</p>
                <div>
                    <IconButton title="Delete" color="secondary" onClick={deleteStudent}><i className="fas fa-trash-alt fa-xs"></i></IconButton>

                    <CreateOrEditStudent
                    curStudent = {curStudent}
                    setCurStudent = {setCurStudent}
                    />
                </div>
            </div>

            <div className="contact-info-box">
                <h4>Contact Information</h4>
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
            </div>

            <div className="dorm-box">
                <h4>Dormity Information</h4>
                { dorm && <DormDetailsShow dorm={dorm} /> }
                
                <SelectDormForm callBack = {assignDorm} dorm={dorm} curStudent={curStudent}/>
            </div>

            <div className="enroll-classes-box">
                <h4>Enrolled Classes: </h4>
                {
                    enrolledCourses.length ===0 ?
                    <p>No enrolling classes yet</p>
                    :
                    <div className="display-enrolled-classes">
                    {
                        enrolledCourses.map((course, i)=>{
                            return(
                                <p>
                                <Link style={{marginRight:'10px'}} to={"/courses/" + course.id}>{course.name}</Link>

                                <RemoveCourseStudent
                                studentId={props.id} 
                                courseId={course.id} 
                                updateDom={updateDom} 
                                fromStudentDetails={true}
                                />
                                </p>
                            );
                        })
                    }
                    </div>
                }
            </div>
            
            <div className="add-classes-box">
                <h4>Add Classes to Student</h4>
                {
                    availableCourses?
                    <div className="display-ac">
                        <AvailableCourses 
                        studentId = {props.id} 
                        setEnrolledCourses = {setEnrolledCourses}
                        setAvailableCourses = {setAvailableCourses}
                        availableCourses = {availableCourses}
                        />
                    </div>
                        :
                        <p>No Class Avaiable at This Time</p>
                }
            </div>
            </>
            )
        }
        </Paper>
    );
}

export default StudentDetails;