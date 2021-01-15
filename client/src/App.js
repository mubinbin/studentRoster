import './App.css';
import {Router, Redirect, Link} from "@reach/router";
import AllStudents from "./component/student/AllStudents.jsx";
import StudentDetails from"./component/student/StudentDetails.jsx";
import CourseDetails from "./component/course/CourseDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <AllStudents path = "/" />
        <StudentDetails path = "/students/:id" />
        <CourseDetails path ="/courses/:id" />
      </Router>
    </div>
  );
}

export default App;
