import React, {useState, useEffect} from "react";
import axios from "axios";
import StudentTable from "./StudentTable.jsx"

const AllStudents = () => {

    const [students, setStudents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // get all students
    useEffect(() => {
        axios.get("http://localhost:8080/api/students")
        .then(res => {
            setStudents(res.data);
            // console.log(students)
            setLoaded(true);
            // console.log(res.data);
        })
        .catch(err => console.log("Error: " + err));
        return () => { setStudents([]); };
    }, [loaded]);

    // pass the students into table component
    return(
        <>
        {loaded && <StudentTable data={students}/>}
        </>
    );
}

export default AllStudents;