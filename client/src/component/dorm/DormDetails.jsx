import React, {useEffect, useState} from "react";
import axios from "axios";
import DormDetailsShow from "./DormDetailsShow";
import CreateOrEditDorm from "./CreateOrEditDorm.jsx";
import {Link} from "@reach/router";
import RemoveStudentFromDorm from "./RemoveStudentFromDorm.jsx";
import AvailableStudents from "../student/AvailableStudents.jsx";

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
        <>
        {
            isLoaded && 
                <>
                <DormDetailsShow dorm = {curDorm} />
                
                <CreateOrEditDorm  
                curDorm = {curDorm} 
                setCurDorm = {setCurDorm}
                />
                <hr/>

                <h3>Students in Dorm</h3>
                {
                    studentsInDorm.length === 0?
                        <p>This Dormity is Empty</p>
                        :
                        <table style={{margin: "auto"}}>
                            <tbody>
                            {
                                studentsInDorm.map((student, i) => {
                                    return(
                                        <tr>
                                            <td><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></td>
                                            
                                            <td>
                                                <RemoveStudentFromDorm
                                                studentId = {student.id}
                                                updateDom = {updateDom}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                        
                }
                <hr/>

                <h3>Add Students to Dorm</h3>
                <AvailableStudents
                items = "dorms"
                itemId = {props.id}
                setNotAvailableStudents = {setStudentsInDorm}
                setAvailableStudents = {setStudentHaveNoDorm}
                availableStudents = {studentsHaveNoDorm}
                />
                </>
        }
        </>
    );

};

export default DormDetails;