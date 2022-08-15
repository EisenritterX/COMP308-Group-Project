import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import PatientHome from './PatientNavBar'

import 'bootstrap/dist/css/bootstrap.min.css'

const LOGIN_NURSE = gql`
    mutation loginNurse( $username: String, $password: String ) {
        loginNurse( username: $username, password: $password  )
    }
`;

const LOGGED_IN_NURSE = gql`
    mutation isLoggedInNurse( $username: String! ) {
        isLoggedInNurse( username: $username ) 
    }
`;

function NurseLogin(props){
    //state variable for login
    const navigate = useNavigate();
    let username, password;
    const [id, setId] = useState('auth');
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_NURSE);
    const [isLoggedIn, { loading1, error1 }] = useMutation(LOGGED_IN_NURSE, {
        onCompleted: (data1) => console.log("Data from mutation", data1),
        onError: (error1) => console.error("Error in mutation", error1),
      });

    const authenticateUser = async () => {
        try {
            console.log(username);
            const results = await loginUser( { variables: { username: username.value, 
                password: password.value }  });
            const {data} = results;
            const loginUserVar = data.loginNurse;
            console.log(results);
            console.log('results from login user:', loginUserVar)
            if (loginUserVar !== undefined) {
                readCookie(loginUserVar);
            }
        }
        catch (error) {
            console.log(error);
        }

    }; 

    //check if the user already logged-in
    const readCookie = async (usernamec) => {
        try {
            console.log('reading cookie');
            const results = await isLoggedIn( { variables: { username: username.value } });
            const {data} = results;
            const isLoggedInVar = data.isLoggedIn
            console.log('auth result from graphql server: ', isLoggedInVar)

        if (isLoggedInVar !== undefined) {
            console.log("nd")
        }
        } catch (e) {
            setId('auth');
            console.log('error: ', e);
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