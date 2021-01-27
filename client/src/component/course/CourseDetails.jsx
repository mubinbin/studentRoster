import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import RemoveCourseStudent from "./RemoveCourseStudent.jsx";
import CreateOrEditCourse from "./CreateOrEditCourse.jsx";
import AvailableStudents from "../student/AvailableStudents.jsx";
import Paper from "@material-ui/core/Paper";
import "./CourseDetails.css";

const CourseDetails = props => {

    const [curCourse, setCurCourse] = useState({});
    const [enrollingStudents, setEnrollingStudent] = useState([]);
    const [studentNotEnrolling, setStudentNotEnrolling] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{

        axios.get("http://localhost:8080/api/courses/" + props.id)
        .then(res=>{
            setCurCourse(res.data);
            setEnrollingStudent(res.data.students);
        })
        .catch(err=>{
            console.log("Error on getting course details. Details: " + err)
        });
        
        axios.get("http://localhost:8080/api/students/courses/" + props.id)
        .then(res=>{
            setStudentNotEnrolling(res.data);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting students not enrolling this class. Details: " + err);
        });

        return (()=>{ setCurCourse({}); setEnrollingStudent([]); setStudentNotEnrolling([]); })
    },[props.id, isLoaded]);

    const updateDom = (removedStudent) => {
        setEnrollingStudent(enrollingStudents.filter(student => student.id !== removedStudent.id));
        setStudentNotEnrolling([
            ...studentNotEnrolling,
            removedStudent
        ]);
    };

    return(
        <Paper elevation={5} id="course-details-paper">
        {
            isLoaded &&
                <>
                <h2>Class Details: </h2>

                <div className="course-details-top">
                    <div className="top-1">
                        <h3>{curCourse.name}</h3>

                        <CreateOrEditCourse 
                        curCourse = {curCourse}
                        setCurCourse = {setCurCourse}
                        />
                    </div>

                    <p className="top-2"><b>Description: </b></p>
                    <p className="top-3">{curCourse.description}</p>
                </div>

                <div className="students-in-class">
                    <h3>Students Enrolling: </h3>
                    {
                        enrollingStudents.length === 0?
                            <p>This class has no students yet</p>
                            :
                            <div className="sic-div-1">
                            {
                                enrollingStudents.map((student, i)=>{
                                    return(
                                        <p key={i}>
                                            <Link to={"/students/" + student.id}>{student.firstName} {student.lastName}</Link>
                                            
                                            <RemoveCourseStudent 
                                            studentId={student.id} 
                                            courseId={props.id} 
                                            updateDom={updateDom} 
                                            fromStudentDetails={false}
                                            />
                                        </p>
                                    );
                                })
                            }
                            </div>
                    }
                </div>

                <div className="add-class-student">
                    <h3>Add Students to Class: </h3>
                    <div className="display-sic">
                        <AvailableStudents
                        items = "courses"
                        itemId = {props.id}
                        setNotAvailableStudents = {setEnrollingStudent}
                        setAvailableStudents = {setStudentNotEnrolling}
                        availableStudents = {studentNotEnrolling}
                        />
                    </div>
                </div>
                </>
        }
        </Paper>
    );
};

export default CourseDetails;