import React, {useState, useEffect} from "react";
import axios from "axios";
import CourseTable from "./CourseTable.jsx";

const AllCourses = props => {

    const [allCourses, setAllCourses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/courses")
        .then(res=>{
            setAllCourses(res.data);
            setIsLoaded(true);
        })
        .catch(err=>{
            console.log("Error on getting all courses. Details: " + err);
        });

        return ( () => {setAllCourses([])} )
    }, [isLoaded])

    const updateDom = removeCourseID => {
        setAllCourses(allCourses.filter(course=>
            course.id !== removeCourseID
        ));
    };

    return(
        <>
        {
            isLoaded &&
                <CourseTable callBack={updateDom} data= {allCourses}/>
        }
        </>
    );
};

export default AllCourses;