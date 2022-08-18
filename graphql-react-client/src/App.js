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
import './App.css';


// ADD COMPONENTS HERE
import Home from './components/Home';
import PatientLogin from './components/PatientLogin';
import PatientSignUp from './components/PatientSignUp';
import NurseLogin from './components/NurseLogin';
import NurseSignUp from './components/NurseSignUp';
import Container from "react-bootstrap/Container";


import Navbar from './components/Navbar';
import PatientNavBar from './components/PatientNavBar';

import NurseNavBar from './components/NurseNavBar';

import PatientReportList from './components/ReportList';
import AddReport from './components/AddReport';

// import StatusPage from './components/Sta'


//
function App() {
  return (
    <Router>
      <Navbar/>
      <div>
      <Container className="text-center text-justify">
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path = "status" element={<StatusPage/>}/> */}
          <Route path = "/" element={<Home />}>

          </Route>

          <Route path = "patientSignUp" element={<PatientSignUp/>}/>
          <Route path = "patientLogin" element={<PatientLogin/>}/>
          <Route path = "nurseLogin" element={<NurseLogin/>}/>
          <Route path = "nurseSignUp" element={<NurseSignUp/>}/>

          <Route path="/patientNavBar" element={<PatientNavBar/>}>
            <Route path = "addReport" element={<AddReport/>}>
              <Route path = ":patientId" element={<AddReport/>}/>
            </Route>
          </Route>

          <Route path="/nurseNavBar" element={<NurseNavBar/>}>
            <Route path = "reportList" element={<PatientReportList/>}/>
            <Route path = "addReport" element={<AddReport/>}>
              <Route path = ":nurseId" element={<AddReport/>}/>
            </Route>
          </Route>
        </Routes>
        </Container>
    </div> 
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
