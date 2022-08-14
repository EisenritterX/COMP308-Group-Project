import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import PatientHome from './PatientHome'

import 'bootstrap/dist/css/bootstrap.min.css'

// ADD COMPONENTS HERE

function NurseLogin(props){
  //state variable for login
  const navigate = useNavigate();
  const [id, setId] = useState('auth');
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();

  const authenticateUser = async () => {
      try {
          console.log("authenticate user");
          // const results = await loginUser( { variables: { studentNumber: studentNumber.value, 
          //     password: password.value }  });
          // const {data} = results;
          // const loginUserVar = data.loginUser;
          // console.log('results from login user:',loginUserVar)
          // if (results !== undefined) {
          //     setId(loginUserVar);
          // }
          navigate('/nurseHome')

      }
      catch (error) {
          console.log(error);
      }

  };
    return(
      <Form>
      <Form.Group>
          <Form.Label> Username</Form.Label>
          <Form.Control type="text"  name="username" ref={node => {username = node; }} 
              placeholder="Username:" />
      </Form.Group>                     

      <Form.Group>
          <Form.Label> Password:</Form.Label>
          <Form.Control type="password"  name="password" ref={node => {password = node; }} 
              placeholder="Password:" />
      </Form.Group>  

      <Button size = "lg" variant="primary" type="Button" onClick={authenticateUser}>Login</Button>
      </Form>
    );
}

export default NurseLogin;