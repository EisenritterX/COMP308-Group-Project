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

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function PatientNavBar(props){
    return(
        <div>
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="/">COMP308 Group Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as ={Link} to="addReport">Add Report</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        <Outlet/>
    </div>
    );
}

export default PatientNavBar;