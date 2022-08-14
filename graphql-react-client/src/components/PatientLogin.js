import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import PatientHome from './PatientNavBar'

const LOGIN_USER = gql`
    mutation loginPatient( $username: String, $password: String ) {
        loginPatient( username: $username, password: $password  )
    }
`;

function PatientLogin(props){

    //state variable for login
    const navigate = useNavigate();
    const [id, setId] = useState('auth');
    let [username, setUsername] = useState();
    let [password, setPassword] = useState();
    const [loginPatient, { data, loading, error }] = useMutation(LOGIN_USER);

    const authenticateUser = async () => {
        try {
            console.log("authenticate user");
            const results = await loginPatient( { variables: { username: username.value, 
                password: password.value }  });
            const {data} = results;
            const loginPatientVar = data.loginPatient;
            console.log('results from login user:',loginPatientVar)
            if (results !== undefined) {
                setId(loginPatientVar);
                navigate('/patientNavBar')
            }

        }
        catch (error) {
            console.log(error);
        }
  
    };

    return (
        <div className="entryform">
        <h1>Patient Login</h1>
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
        </div>
    );
}

export default PatientLogin;