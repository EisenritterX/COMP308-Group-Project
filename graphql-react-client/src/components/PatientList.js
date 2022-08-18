import React from 'react';
import {gql, useQuery} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import date from 'graphql-date';

const GET_PATIENTS = gql`{
    patients{
        id
    }
}`;

const PatientList=()=>{
    const {loading, error, data, refetch} = useQuery(GET_PATIENTS);

    if(loading) return <p>Loading...</p>;
    if(loading) return <p>Error...</p>;

    return(
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>patientId</th>
                        <th>username</th>
                        <th>fname</th>
                        <th>lname</th>
                    </tr>
                    {data.reports.map((patient,index)=>(
                        <tr key={index}>
                            <td>{patient.patientId}</td>
                            <td>{patient.fname}</td>
                            <td>{patient.lname}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
             <div className="center">
                <button className='center' onClick={()=>refetch()}>
                    Refetch
                </button>
            </div>
        </div>
    )

}

export default PatientList;