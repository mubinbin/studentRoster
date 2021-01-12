import './App.css';
import {Router, Redirect, Link} from "@reach/router";
import AllStudents from "./component/student/AllStudents.jsx";
import StudentDetails from"./component/student/StudentDetails.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <AllStudents path = "/" />
        <StudentDetails path = "/students/:id" />
      </Router>
    </div>
  );
}

export default App;
