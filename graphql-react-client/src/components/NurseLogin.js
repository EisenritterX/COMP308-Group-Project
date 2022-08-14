import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import PatientHome from './PatientNavBar'

import 'bootstrap/dist/css/bootstrap.min.css'

const LOGIN_USER = gql`
    mutation loginUser( $username: String, $password: String ) {
        loginUser( username: $username, password: $password  )
    }
`;

function NurseLogin(props){
  //state variable for login
  const navigate = useNavigate();
  const [id, setId] = useState('auth');
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const authenticateUser = async () => {
    try {
        console.log("authenticate user");
        const results = await loginUser( { variables: { username: username.value, 
            password: password.value }  });
        const {data} = results;
        const loginUserVar = data.loginUser;
        console.log('results from login user:',loginUserVar)
        if (results !== undefined) {
            setId(loginUserVar);
            navigate('/nurseNavBar')
        }

    }
    catch (error) {
        console.log(error);
    }
  };
    return(
      <Form>
      <h1>Nurse Login</h1>
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