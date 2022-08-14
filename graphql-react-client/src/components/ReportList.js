import React from 'react';
import {gql, useQuery} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import date from 'graphql-date';

const GET_REPORTS = gql`{
    reports{
        _id
        patientId
        nurseId
        bodyTemperature
        heartRate
        bloodPressure
        respiratoryRate
        dateFilled
    }
}`;

const ReportList=()=>{
    const {loading, error, data, refetch} = useQuery(GET_REPORTS);

    if(loading) return <p>Loading...</p>;
    if(loading) return <p>Error...</p>;

    return(
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>_id</th>
                        <th>patientId</th>
                        <th>nurseId</th>
                        <th>bodyTemperature</th>
                        <th>heartRate</th>
                        <th>bloodPressure</th>
                        <th>respiratoryRate</th>
                        <th>dateFiled</th>
                    </tr>
                    {data.students.map((report,index)=>(
                        <tr key={index}>
                            <td>{report._id}</td>
                            <td>{report.patientId}</td>
                            <td>{report.nurseId}</td>
                            <td>{report.bodyTemperature}</td>
                            <td>{report.heartRate}</td>
                            <td>{report.bloodPressure}</td>
                            <td>{report.repiratoryRate}</td>
                            <td>{report.dateFiled}</td>
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

export default ReportList;