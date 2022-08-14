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

import PatientHome from './components/PatientHome';

import NurseHome from './components/NurseHome';

import PatientReportList from './components/ReportList';
import AddReport from './components/AddReport';


//
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<Home />} />

          <Route path = "/" element={<Home />}>
            <Route path = "patientSignUp" element={<PatientSignUp/>}/>
            <Route path = "patientLogin" element={<PatientLogin/>}/>
            <Route path = "nurseLogin" element={<NurseLogin/>}/>
            <Route path = "nurseSignUp" element={<NurseSignUp/>}/>
          </Route>

          <Route path="/patientHome" element={<PatientHome/>}>
            <Route path = "addReport" element={<AddReport/>}/>
          </Route>

          <Route path="/nurseHome" element={<NurseHome/>}>
            <Route path = "reportList" element={<PatientReportList/>}/>
            <Route path = "addReport" element={<AddReport/>}/>
          </Route>

        </Routes>
    </div> 
      
      

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
