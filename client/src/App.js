import './App.css';
import {Router, Redirect, Link} from "@reach/router";
import AllStudents from "./component/student/AllStudents.jsx";
import AllDorms from "./component/dorm/AllDorms.jsx";
import StudentDetails from "./component/student/StudentDetails.jsx";
import DormDetails from "./component/dorm/DormDetailsShow.jsx";
import CourseDetails from "./component/course/CourseDetails.jsx";
import NavBar from "./component/module/NavBar";
import CreateOrEditStudent from "./component/student/CreateOrEditStudent.jsx";

function App() {
  return (
    <div className="App">
      <NavBar>
      <CreateOrEditStudent />
      <Router>
        <AllStudents path = "/" />
        <StudentDetails path = "/students/:id" />
        <AllDorms path = "/dorms" />
        <DormDetails path ="/dorms/:id" />
        <CourseDetails path ="/courses/:id" />
      </Router>
      </NavBar>
    </div>
  );
}

export default App;
