import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import RemoveCourseStudent from "./RemoveCourseStudent.jsx";
import CreateOrEditCourse from "./CreateOrEditCourse.jsx";

const CourseDetails = props => {

    const [curCourse, setCurCourse] = useState({});
    const [enrollingStudents, setEnrollingStudent] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{

        axios.get("http://localhost:8080/api/courses/" + props.id)
        .then(res=>{
            setCurCourse(res.data);
            setEnrollingStudent(res.data.students);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting course details. Details: " + err)
        });

    },[props.id, isLoaded]);

    const updateDom = (studentId) => {
        setEnrollingStudent(enrollingStudents.filter(student => student.id !== studentId));
    };

    return(
        <>
        {
            isLoaded &&
                <>
                <h1>{curCourse.name}</h1>

                <p><b>description: </b></p>
                <p>{curCourse.description}</p>
                <CreateOrEditCourse 
                curCourse = {curCourse}
                setCurCourse = {setCurCourse}
                />
                <hr/>

                <h3>Student Enrolling: </h3>
                {
                    enrollingStudents.map((student, i)=>{
                        return(
                            <>
                            <span key={i}><Link to={"/students/" + student.id}>{student.firstName} {student.lastName}</Link></span> | 
                            <RemoveCourseStudent studentId={student.id} courseId={props.id} updateDom={updateDom} fromStudentDetails={false}/>
                            <br/>
                            </>
                        );
                    })
                }

                <h3>Add Student to Class: </h3>
                </>

        }
        </>
    );
};

export default CourseDetails;