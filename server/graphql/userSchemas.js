var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
const mongoose = require("mongoose");

//TODO: create and import Patient and Nurse models
// var NurseModel = require("../models/Nurse");
// var PatientModel = require("../models/Patient");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GraphQLInputObjectType, GraphQLFloat } = require('graphql');
const JWT_SECRET = "some_secret_key"; 
const jwtExpirySeconds = 300;

//Patient Type
const PatientType = new GraphQLObjectType({
    name: "patient",
    fields: () => ({
        id: {type: GraphQLString},
        fName: {type: GraphQLString},
        lName: {type: GraphQLString},
        emergency: {type: GraphQLBoolean}, //true if emergency attention is required
        nurseId: {type: GraphQLString},
    })
});

//Nurse Type
const NurseType = new GraphQLObjectType({
    name: "nurse",
    fields: () => ({
        id: {type: GraphQLString},
        fName: {type: GraphQLString},
        lName: {type: GraphQLString},
        //if there is a 1-1 relationship
        patientId: {type: GraphQLString},
        //if there is a 1-many relationship:
        // patients: {
        //     type: new GraphQLList(PatientType)
        // }

    })
});

// Patient Report Type
// this is the patient report
const ReportType =  new GraphQLObjectType({
    name: "report",
    fields: () => ({
        id: {type: GraphQLString},
        patientId: {type: GraphQLString},
        nurseId: {type: GraphQLString},
        bodyTemperature:{type: GraphQLFloat},
        heartRate:{type:GraphQLInt},
        bloodPressure:{type: GraphQLInt},
        respiratoryRate:{type: GraphQLInt},
        dateFiled:{type: GraphQLDate}        
    })
});

// Alert Type
// this is the emergency alert that will be sent to the responder
const AlertType =  new GraphQLObjectType({
    name: "alert",
    fields: () => ({
        id: {type: GraphQLString},
        patientId: {type: GraphQLString},
        responderId: {type: GraphQLString},
        nurseId:{type: GraphQLString}
    })
});

// Symptom
// This is a single symptom that will have a name and a weight 
const Symptom =  new GraphQLObjectType({
    name: "report",
    fields: () => ({
        id: {type: GraphQLString},
        symptom: {type: GraphQLString},
        weight: {type: GraphQLFloat}
    })
});




//TODO: Login mutations