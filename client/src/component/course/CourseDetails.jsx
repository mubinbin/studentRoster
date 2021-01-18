import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import RemoveCourseStudent from "./RemoveCourseStudent.jsx";
import CreateOrEditCourse from "./CreateOrEditCourse.jsx";
import AvailableStudents from "../student/AvailableStudents.jsx";

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

                <h3>Students Enrolling: </h3>
                {
                    enrollingStudents.length === 0?
                    <p>This class has no students yet</p>
                    :
                    <table style={{margin: "auto"}}>
                        <tbody>
                        {
                            enrollingStudents.map((student, i)=>{
                                return(
                                    <tr>
                                        <td key={i}>
                                            <Link to={"/students/" + student.id}>{student.firstName} {student.lastName}</Link>
                                        </td>
                                            
                                        <td>
                                            <RemoveCourseStudent 
                                            studentId={student.id} 
                                            courseId={props.id} 
                                            updateDom={updateDom} 
                                            fromStudentDetails={false}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                }

                <h3>Add Students to Class: </h3>
                <AvailableStudents
                items = "courses"
                itemId = {props.id}
                setNotAvailableStudents = {setEnrollingStudent}
                setAvailableStudents = {setStudentNotEnrolling}
                availableStudents = {studentNotEnrolling}
                />
                </>

        }
        </>
    );
};

export default CourseDetails;