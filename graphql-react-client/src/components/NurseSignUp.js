import React,{Component} from "react"
//
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
  Outlet
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
// ADD COMPONENTS HERE

function NurseSignUp(props){
    return(
        <h1>Nurse Sign Up</h1>
    );
}

export default NurseSignUp;