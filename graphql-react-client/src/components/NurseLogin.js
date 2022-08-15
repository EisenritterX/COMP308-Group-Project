import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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

    const [loginNurse, { data, loading, error }] = useMutation(LOGIN_NURSE);

    const[isLoggedIn, {loading1,error1}] = useMutation(LOGGED_IN_NURSE,{
        onCompleted:(data1)=> console.log("Data from mutation", data1),
        onError:(error1)=> console.error("Error in mutation",error1)
    });

    //state variable for the screen, admin or user
    const [id, setId] = useState('auth');
    const [screen, setScreen] = useState('auth');

    //store input field data, user name and password
    let [username, setUsername] = useState();
    let [password, setPassword] = useState();

    const authenticateUser = async () => {
        try {
            console.log(username);
            const results = await loginNurse( { variables: { username: username.value, 
                password: password.value }  });
            const {data} = results;
            const loginNurseId = data.loginNurse;
            console.log(results);
            console.log('results from login user:', loginNurseId)
            if (results !== undefined) {
                setScreen(loginNurseId);
            }
        }
        catch (error) {
            console.log(error);
        }

    }; 

//check if the user already logged-in
const readCookie = async()=>{
    try{
        console.log('--- in readCookie function ---');

    const results = await isLoggedIn( { variables: { username: username.value } });

    const {data} = results;
    const isLoggedInVar = data.isLoggedIn
    console.log('auth result from graphql server: ', isLoggedInVar)

    if (isLoggedInVar !== undefined) {
        setScreen(isLoggedInVar);
    }
    } catch (e) {
        setScreen('auth');
        console.log('error: ', e);
    }
};


    useEffect(() => {
        readCookie();
    }, []);
    //
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    //


    return (
        <div className="entryform">
        {screen === 'auth'?<div>
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
            :navigate("/nurseNavBar/addReport/"+data.loginNurse)
    }
        </div>
    );
}

export default NurseLogin;