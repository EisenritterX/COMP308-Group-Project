import React, { Component,useState } from "react";
//
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed:
//  npm install react-bootstrap bootstrap
//
import "bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Stack from "react-bootstrap/Stack";
// ADD COMPONENTS HERE

function Home(props) {
  const navigate = useNavigate();
    // read the info from props, coming from the ancestor component
    const { screen, setScreen } = props;
    // return a stateful value and funcion to update it
    const [data, setData] = useState();
    //
  
  return (
      <div>
      <p>{screen}</p>
      <p>{data}</p>
        <Container className="text-center text-justify">
          <Stack className="text-center text-justify" gap={3}>
            <h1>{"Welcome to Group 5 Patient Care System"}</h1>
            <h2>{"Please select your status:"}</h2>
            <ButtonGroup aria-label="Basic example" size="lg">
              <Button
                variant="primary"
                onClick={() => navigate("/nurseLogin/")}
              >
                Nurse
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => navigate("/patientNavBar/")}
              >
                Patient
              </Button>
            </ButtonGroup>
          </Stack>
        </Container>
      </div>
  );
}

export default Home;
