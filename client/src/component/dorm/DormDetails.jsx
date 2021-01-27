import React, {useEffect, useState} from "react";
import axios from "axios";
import DormDetailsShow from "./DormDetailsShow";
import CreateOrEditDorm from "./CreateOrEditDorm.jsx";
import {Link} from "@reach/router";
import RemoveStudentFromDorm from "./RemoveStudentFromDorm.jsx";
import AvailableStudents from "../student/AvailableStudents.jsx";
import Paper from '@material-ui/core/Paper';
import "./DormDetails.css";

const DormDetails = props => {

    const [curDorm, setCurDorm] = useState({});
    const [studentsInDorm, setStudentsInDorm] = useState([]);
    const [studentsHaveNoDorm, setStudentHaveNoDorm] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/dorms/" + props.id)
        .then(res=>{
            setCurDorm(res.data);
            setStudentsInDorm(res.data.students);
        })
        .catch(err=>{
            console.log("Error on geting dorm information. Details: " + err);
        });
        
        axios.get("http://localhost:8080/api/students/nodorm")
        .then(res=>{
            setStudentHaveNoDorm(res.data);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log(`Error on getting students have no dorm. Detail : ${err}`);
        });

        return( ()=> { setCurDorm({}); setStudentHaveNoDorm([]); } );
    }, [isLoaded]);

    const updateDom = removedStudent => {
        
        setStudentsInDorm(studentsInDorm.filter(student=>
            student.id !== removedStudent.id
        ));

        setStudentHaveNoDorm([
            ...studentsHaveNoDorm,
            removedStudent
        ]);

    };

    return(
        <Paper elevation={5} id="dorm-details-paper">
        {
            isLoaded && 
                <>
                <h2>Dormitory Details: </h2>
                
                <div className="dorm-details-top">
                    <div className="top-1">
                        <DormDetailsShow dorm = {curDorm} />

                        <CreateOrEditDorm  
                        curDorm = {curDorm} 
                        setCurDorm = {setCurDorm}
                        />
                    </div>

                    <p className="top-2"><b>Dorm Address: </b>{curDorm.address}</p>
                </div>

                <div className="students-in-dorm">
                    <h3>Students in Dorm</h3>
                    {
                        studentsInDorm.length === 0?
                            <p>This Dormity is Empty</p>
                            :
                            <div className="sid-div-1">
                            {
                                studentsInDorm.map((student, i) => {
                                    return(
                                        <p>
                                        <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}
                                        </Link>
                                            
                                        <RemoveStudentFromDorm
                                        studentId = {student.id}
                                        updateDom = {updateDom}
                                        />
                                        </p>
                                    );
                                })
                            }
                            </div>
                    }
                </div>

                <div className="add-dorm-student">
                    <h3>Add Students to Dorm: </h3>
                    <div className="display-sid">
                        <AvailableStudents
                        items = "dorms"
                        itemId = {props.id}
                        setNotAvailableStudents = {setStudentsInDorm}
                        setAvailableStudents = {setStudentHaveNoDorm}
                        availableStudents = {studentsHaveNoDorm}
                        />
                    </div>
                </div>
                </>
        }
        </Paper>
    );

};

export default DormDetails;