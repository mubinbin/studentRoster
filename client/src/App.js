import './App.css';
import {Router, Redirect, Link} from "@reach/router";
import AllStudents from "./component/student/AllStudents.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <AllStudents path="/" />
      </Router>
    </div>
  );
}

export default App;
