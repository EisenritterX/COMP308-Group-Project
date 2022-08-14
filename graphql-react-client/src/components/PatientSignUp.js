import React, { Component, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import StatusPage from './StatusPage'

const CREATE_PATIENT = gql`
mutation addPatient(
    $username: String,  
    $password: String, 
    $fName: String,         
    $lName: String, 
    ) {
    addPatient(
        username: $username,  
        password: $password,
        fName: $fName,      
        lName: $lName)
    }`;

function PatientSignUp(props){

    const navigate = useNavigate();
    let username, password, fName, lName;
    const [addPatient, { data, loading, error }] = useMutation(CREATE_PATIENT);

    return (
        <div className="entryform">
            <form
                onSubmit={ e => {    
                    e.preventDefault();
                    addPatient( { variables: { username: username.value, password: password.value, 
                        fName: fName.value, lName: lName.value } 
                    });

                    navigate('/home')                    
                } 
            }
            >
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
            <Form.Group>
                <Form.Label> First Name</Form.Label>
                <Form.Control type="text"  name="fName" ref={node => {fName = node; }} 
                    placeholder="First Name:" />
            </Form.Group>                     

            <Form.Group>
                <Form.Label> Last Name:</Form.Label>
                <Form.Control type="lName"  name="lName" ref={node => {lName = node; }} 
                    placeholder="Last Name:" />
            </Form.Group>  
            <Button variant="primary" type="submit"> Create Patient</Button>
        </form>
        </div>
    );
}

export default PatientSignUp;