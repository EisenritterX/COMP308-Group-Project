import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
// ADD COMPONENTS HERE
import AddReport from './components/AddReport';
// import AddStudent from './components/AddStudent';
// import EditStudent from './components/EditStudent';
// import DeleteStudent from './components/DeleteStudent';

import Home from './components/Home';
import PatientLogin from './components/PatientLogin';
import PatientSignUp from './components/PatientSignUp';
import StatusPage from './components/StatusPage';
import PatientReportList from './components/ReportList';

//
function App() {

  return (
    <Router>
      
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">COMP308 Group Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              <Nav.Link as ={Link} to="/addreport">Add Patient Report</Nav.Link>
              <Nav.Link as ={Link} to="/reportlist">Patient Report List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path = "home" element={<Home />} />
          <Route path = "addreport" element ={<AddReport/>}/>
          <Route path = "login" element={<Login/>}/>
          <Route path = "status" element={<StatusPage/>}/>
          <Route path = "reportlist" element={<PatientReportList/>}/>


        </Routes>
    </div>
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
