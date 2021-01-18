import './App.css';
import {Router, Redirect, Link} from "@reach/router";
import AllStudents from "./component/student/AllStudents.jsx";
import AllDorms from "./component/dorm/AllDorms.jsx";
import StudentDetails from "./component/student/StudentDetails.jsx";
import DormDetails from "./component/dorm/DormDetails.jsx";
import CourseDetails from "./component/course/CourseDetails.jsx";
import NavBar from "./component/module/NavBar";
import CreateOrEditStudent from "./component/student/CreateOrEditStudent.jsx";
import CreateOrEditDorm from "./component/dorm/CreateOrEditDorm.jsx";
import CreateOrEditCourse from "./component/course/CreateOrEditCourse.jsx";
import AllCourses from "./component/course/AllCourses.jsx";

function App() {
  return (
    <div className="App">
      <NavBar>
      <div style={{display: "flex", justifyContent:"space-evenly"}}>
        <CreateOrEditStudent />
        <CreateOrEditDorm />  
        <CreateOrEditCourse />  
      </div>
      <Router>
        <AllStudents path = "/" />
        <StudentDetails path = "/students/:id" />
        <AllDorms path = "/dorms" />
        <DormDetails path = "/dorms/:id" />
        <AllCourses path = "/courses" />
        <CourseDetails path ="/courses/:id" />
      </Router>
      </NavBar>
    </div>
  );
}

export default App;
