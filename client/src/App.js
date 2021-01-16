import './App.css';
import {Router, Redirect, Link} from "@reach/router";
import AllStudents from "./component/student/AllStudents.jsx";
import StudentDetails from"./component/student/StudentDetails.jsx";
import CourseDetails from "./component/course/CourseDetails";
import NavBar from "./component/module/NavBar";
import CreateOrEditStudent from "./component/student/CreateOrEditStudent";

function App() {
  return (
    <div className="App">
      <NavBar>
      <CreateOrEditStudent />
      <Router>
        <AllStudents path = "/" />
        <StudentDetails path = "/students/:id" />
        <CourseDetails path ="/courses/:id" />
      </Router>
      </NavBar>
    </div>
  );
}

export default App;
