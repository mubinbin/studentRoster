import React, {useState} from "react";
import axios from "axios";
import CheckBox from "../module/CheckBox.jsx";
import "./AvailableCourses.css";

const AvailableCourses = props =>{

    const [checkedAll, setCheckedAll] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const onChangeHandler = (e) => {
        
        setCheckedAll(!checkedAll);
        if(e.target.checked){
            for(let course of props.availableCourses){
                if(!selectedCourses.includes(course.id)){
                    selectedCourses.push(course.id)
                }
            }
        }else{
            setSelectedCourses([]);
        }
    };
    
    const addToSelectedCourses = (isChecked, checkedCourseId) => {
        checkedCourseId = Number(checkedCourseId); 
        if(isChecked){
            setSelectedCourses([
                ...selectedCourses,
                checkedCourseId
            ])
        }else{
            setSelectedCourses(selectedCourses.filter(courseId => courseId!== checkedCourseId));
        }
    };

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.patch("http://localhost:8080/api/students/addcourses/" + props.studentId, selectedCourses)
        .then(res=>{
            props.setEnrolledCourses(res.data[0]);
            props.setAvailableCourses(res.data[1]);
            
            // reset the selected course array
            setSelectedCourses([]);
            setCheckedAll(false);
            setIsLoaded(false);
        })
        .catch(err=>{
            console.log("Error on add courses. Details: " + err);
        });
    };
    
    return(
        <form onSubmit={onSubmitHandler}>
            <div className="available-courses-div1">
                <p>
                    <input type="checkbox" checked={checkedAll} onChange={onChangeHandler} />
                    <b> Check All</b>
                </p>
                <input className="input-btn" type="submit" value="ENROLL CLASSES" />
            </div>
            <div className="available-courses-div2">
            {
                props.availableCourses.map((course, i) => {
                    return(
                        <p>
                            <CheckBox 
                            key = {i} 
                            item = {course}
                            student = {false}
                            checkedAll = {checkedAll}
                            callBack = {addToSelectedCourses}
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

export default AvailableCourses;