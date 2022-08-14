import React, { components } from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup"
//
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ADD_REPORT = gql`
mutation AddReport(
  $patientId: String!,
  $nurseId: String!,
  $bodyTemperature: Float!,
  $heartRate: Int!,
  $bloodPressure: Int!,
  $respiratoryRate: Int!,
  $dateFiled: Date!
) {
  addReport(
    patientId: $patientId,
    nurseId: $nurseId,
    bodyTemperature: $bodyTemperature,
    heartRate: $heartRate,
    bloodPressure: $bloodPressure,
    respiratoryRate: $respiratoryRate,
    dateFiled: $dateFiled
  ){
    nurseId
  }
}
`;

const AddReport = () => {
  //
  let navigate = useNavigate();
  let { patientId, nurseId } = useParams();
  let bodyTemperature, heartRate, bloodPressure, respiratoryRate,dateFiled;
  // let dateFiled = new Date();
  const [addReport, { data, loading, error }] = useMutation(ADD_REPORT);

  if (loading) return "Submitting Report...";
  if (error) return `Submission error! ${error.message}`;

  console.log(patientId,nurseId);

  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {


          e.preventDefault();
          patientId= "02";
          nurseId= "04";
          addReport({
            variables: {
              patientId: patientId,
              nurseId: nurseId,
              bodyTemperature: parseFloat(bodyTemperature.value),
              heartRate: parseInt(heartRate.value),
              bloodPressure: parseInt(bloodPressure.value),
              respiratoryRate: parseInt(respiratoryRate.value),
              dateFiled: new Date().toISOString(),
            },
          });
          //
          bodyTemperature.value = "";
          heartRate.value = "";
          bloodPressure.value = "";
          respiratoryRate.value = "";
          navigate("/nurseNavBar/reportList");
        }}
      >
        {/* <Form.Group>
        <Form.Label> Patient ID</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              name="patientId"
              ref={(node) => {
                nurseId = nurseId;
              }}
              placeholder={nurseId}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
        <Form.Label> Nurse ID</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              name="nurseId"
              ref={(node) => {
                patientId = patientId;
              }}
              placeholder={patientId}
            />
          </InputGroup>
        </Form.Group> */}
        <Form.Group>
          <Form.Label> Body Temperature</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              name="bodyTemperature"
              ref={(node) => {
                bodyTemperature = node;
              }}
              placeholder="Body Temperature:"
            />
            <InputGroup.Text id="basic-addon2">&#8451;</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Blood Pressure</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              name="heartRate"
              ref={(node) => {
                heartRate = node;
              }}
              placeholder="Heart Rate:"
            />
            <InputGroup.Text id="basic-addon2">bpm</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label> Blood Pressure</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              name="bloodPressure"
              ref={(node) => {
                bloodPressure = node;
              }}
              placeholder="Blood Pressure:"
            />
            <InputGroup.Text id="basic-addon2">mmHg</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label> Respiratory Rate</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              name="respiratoryRate"
              ref={(node) => {
                respiratoryRate = node;
              }}
              placeholder="Respiratory Rate:"
            />
            <InputGroup.Text id="basic-addon2">bpm</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit"> Add Report </Button>
      </form>
    </div>
  );
}

export default AddReport;
