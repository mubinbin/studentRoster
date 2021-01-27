import React, {useState} from "react";
import axios from "axios";
import CheckBox from "../module/CheckBox.jsx";
import "./AvailableStudents.css";

const AvailableStudents = props => {

    const [checkedAll, setCheckedAll] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    
    const onChangeHandler = (e) => {
        
        setCheckedAll(!checkedAll);
        if(e.target.checked){
            for(let student of props.availableStudents){
                if(!selectedStudents.includes(student.id)){
                    selectedStudents.push(student.id)
                }
            }
        }else{
            setSelectedStudents([]);
        }
    };

    const addToSelectedStudents = (isChecked, checkedStudentId) => {
        checkedStudentId = Number(checkedStudentId); 
        if(isChecked){
            setSelectedStudents([
                ...selectedStudents,
                checkedStudentId
            ])
        }else{
            setSelectedStudents(selectedStudents.filter(studentId => studentId !== checkedStudentId));
        }
    };

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.patch(`http://localhost:8080/api/${props.items}/addstudents/${props.itemId}`, selectedStudents)
        .then(res=>{
            props.setNotAvailableStudents(res.data[0]);
            props.setAvailableStudents(res.data[1]);
            
            // reset the selected course array
            setSelectedStudents([]);
            setCheckedAll(false);
            setIsLoaded(false);
        })
        .catch(err=>{
            console.log(`Error on adding students. Details: ${err}`);
        });
    };

    return(
        <form onSubmit={onSubmitHandler}>
            <div className="available-students-div1">
                <p>
                    <input type="checkbox" checked={checkedAll} onChange={onChangeHandler} />
                    <b> Check All</b>
                </p>
                <input className="input-btn" type="submit" value="ADD STUDENT" />
            </div>
            <div className="available-students-div2">
            {
                props.availableStudents.map((student, i) => {
                    return(
                        <p>
                        <CheckBox 
                        key = {i} 
                        item = {student}
                        student = {true}
                        checkedAll = {checkedAll}
                        callBack = {addToSelectedStudents}
                        isLoaded = {isLoaded}
                        setIsLoaded = {setIsLoaded}
                        />
                        </p>
                    );
                })
            }
            </div>
        </form>
    );
};

export default AvailableStudents;