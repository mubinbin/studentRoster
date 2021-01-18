import React, {useEffect, useState} from "react";
import axios from "axios";
import DormDetailsShow from "./DormDetailsShow";
import CreateOrEditDorm from "./CreateOrEditDorm.jsx";
import {Link} from "@reach/router";
import RemoveStudentFromDorm from "./RemoveStudentFromDorm.jsx";

const DormDetails = props => {

    const [curDorm, setCurDorm] = useState({});
    const [studentsInDorm, setStudentsInDorm] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/dorms/" + props.id)
        .then(res=>{
            setCurDorm(res.data);
            setStudentsInDorm(res.data.students);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on geting dorm information. Details: " + err);
        });

        return( ()=> {setCurDorm({});} );
    }, [isLoaded]);

    const updateDom = removedStudentId => {
        setStudentsInDorm(studentsInDorm.filter(student=>
            student.id !== removedStudentId
        ));
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
                <hr/>

                <h3>Add Students to Dorm</h3>
                </>
        }
        </>
    );

};

export default DormDetails;