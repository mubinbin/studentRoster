import React, {useEffect, useState} from "react";
import axios from "axios";
import CheckBox from "../module/CheckBox.jsx";

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
        axios.patch("http://localhost:8080/api/courses/addstudent/" + props.studentId, selectedCourses)
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
        <>
            <form onSubmit={onSubmitHandler}>
                <input type="checkbox" checked={checkedAll} onChange={onChangeHandler} />
                <span> Check All</span>
                <br/>
                {
                    props.availableCourses.map((course, i) => {
                        return(
                            <>
                                <CheckBox 
                                key = {i} 
                                item = {course} 
                                checkedAll = {checkedAll}
                                callBack = {addToSelectedCourses}
                                isLoaded = {isLoaded}
                                setIsLoaded = {setIsLoaded}
                                />
                                <br/>
                            </>
                        );
                    })
                }
                <input type="submit" value="Enroll Classes" />
            </form>
        </>
    );
};

export default AvailableCourses;