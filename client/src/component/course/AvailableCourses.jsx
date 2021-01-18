import React, {useState} from "react";
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
            <div>
                <input type="checkbox" checked={checkedAll} onChange={onChangeHandler} />
                <span> Check All</span>
            </div>
            <table style={{margin: "auto"}}>
                <tbody>
                {
                    props.availableCourses.map((course, i) => {
                        return(
                            <tr>
                                <td>
                                <CheckBox 
                                key = {i} 
                                item = {course}
                                student = {false}
                                checkedAll = {checkedAll}
                                callBack = {addToSelectedCourses}
                                isLoaded = {isLoaded}
                                setIsLoaded = {setIsLoaded}
                                />
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <input type="submit" value="ENROLL CLASSES" />
        </form>
    );
};

export default AvailableCourses;