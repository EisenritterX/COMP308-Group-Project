var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLBoolean = require("graphql").GraphQLBoolean;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLFloat = require("graphql").GraphQLFloat;
var GraphQLDate = require("graphql-date");
const mongoose = require("mongoose");

//TODO: create and import Patient and Nurse models
var NurseModel = require("../models/Nurse");
var PatientModel = require("../models/Patient");
var ReportModel = require("../models/PatientReport");
var EmergencyAlertModel = require("../models/EmergencyAlert");
var SymptomModel = require("../models/SymptomList");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean } = require("graphql");
// const JWT_SECRET = "some_secret_key";
// const jwtExpirySeconds = 300;

//Patient Type
const PatientType = new GraphQLObjectType({
  name: "patient",
  fields: () => ({
    id: { type: GraphQLString },
    fName: { type: GraphQLString },
    lName: { type: GraphQLString },
    emergency: { type: GraphQLBoolean }, //true if emergency attention is required
    nurseId: { type: GraphQLString },
  }),
});

//Nurse Type
const NurseType = new GraphQLObjectType({
  name: "nurse",
  fields: () => ({
    id: { type: GraphQLString },
    fName: { type: GraphQLString },
    lName: { type: GraphQLString },
    //if there is a 1-1 relationship
    patientId: { type: GraphQLString },
    //if there is a 1-many relationship:
    // patients: {
    //     type: new GraphQLList(PatientType)
    // }
  }),
});

// Patient Report Type
// this is the patient report
const ReportType = new GraphQLObjectType({
  name: "report",
  fields: () => ({
    id: { type: GraphQLString },
    patientId: { type: GraphQLString },
    nurseId: { type: GraphQLString },
    bodyTemperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLInt },
    bloodPressure: { type: GraphQLInt },
    respiratoryRate: { type: GraphQLInt },
    dateFiled: { type: GraphQLDate },
  }),
});

// Alert Type
// this is the emergency alert that will be sent to the responder
const AlertType = new GraphQLObjectType({
  name: "alert",
  fields: () => ({
    id: { type: GraphQLString },
    patientId: { type: GraphQLString },
    responderId: { type: GraphQLString },
    nurseId: { type: GraphQLString },
  }),
});

// Symptom
// This is a single symptom that will have a name and a weight
const SymptomType = new GraphQLObjectType({
  name: "symptom",
  fields: () => ({
    id: { type: GraphQLString },
    symptom: { type: GraphQLString },
    weight: { type: GraphQLFloat },
  }),
});

// GraphQL List of Patients, Nurses, and Reports
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      patients: {
        type: new GraphQLList(PatientType),
        resolve: function () {
          const patients = PatientModel.find().exec();
          if (!patients) {
            throw new Error("No patient founds!");
          }
          return patients;
        },
      },
      patient: {
        type: PatientType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const patientInfo = PatientModel.findById(params.id).exec();
          if (!patientInfo) {
            throw new Error("This patient does noe exist!");
          }
          return patientInfo;
        },
      },
      nurses: {
        type: new GraphQLList(NurseType),
        resolve: function () {
          const nurses = NurseModel.find().exec();
          if (!nurses) {
            throw new Error("No nurse founds!");
          }
          return nurses;
        },
      },
      nurse: {
        type: NurseType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const nurseInfo = NurseModel.findById(params.id).exec();
          if (!nurseInfo) {
            throw new Error("This nurse does noe exist!");
          }
          return nurseInfo;
        },
      },
      reports: {
        type: new GraphQLList(ReportType),
        resolve: function () {
          const reports = ReportModel.find().exec();
          if (!reports) {
            throw new Error("There are no reports!");
          }
          return reports;
        },
      },
      reportByID: {
        type: ReportType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const reportInfo = ReportModel.findById(params.id).exec();
          if (!reportInfo) {
            throw new Error("This report does noe exist!");
          }
          return reportInfo;
        },
      },
      reportByPatient: {
        type: new GraphQLList(ReportType),
        args: {
          id: {
            name: "_patientId",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const reports = ReportModel.find({
            patientId: params.patientId,
          }).exec();
          if (!reports) {
            throw new Error("There are no reports!");
          }
          return reports;
        },
      },
    };
  },
});

//GraphQL Mutations
const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: function(){
    return{
        addPatient:{
            type: PatientType,
            args:{
                fName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                lName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                fName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                emergency:{
                    type: new GraphQLNonNull(GraphQLBoolean)
                },
                nurseId:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve:function(root,params){
                const patientModel = new PatientModel(params);
                const newPatient = patientModel.save();
                if(!newPatient){
                    throw new Error('Error');
                }
                return newPatient
            }
        },
        addNurse:{
            type: NurseType,
            args:{
                fName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                lName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                patientId:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve:function(root,params){
                const nurseModel = new NurseModel(params);
                const newNurse = nurseModel.save();
                if(!newNurse){
                    throw new Error('Nurse Missing!');
                }
                return newNurse
            }
        },
        addReport:{
            type: ReportType,
            args:{
                patientId:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                nurseId:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                bodyTemperature:{
                    type: new GraphQLNonNull(GraphQLFloat)
                },
                heartRate:{
                    type: new GraphQLNonNull(GraphQLInt)
                },
                bloodPressure:{
                    type: new GraphQLNonNull(GraphQLInt)
                },
                respiratoryRate:{
                    type: new GraphQLNonNull(GraphQLInt)
                },
                dateFiled:{
                    type: new GraphQLNonNull(GraphQLDate)
                }
            },
            resolve:function(root,params){
                const reportModel = new ReportModel(params);
                const newReport = reportModel.save();
                if(!newReport){
                    throw new Error('Report Missing!');
                }
                return newReport
            }
        },
        addAlert:{
            type: AlertType,
            args:{
                patientId:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                responderId:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                nurseId:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve:function(root,params){
                const alertModel = new EmergencyAlertModel(params);
                const newAlert = alertModel.save();
                if(!newAlert){
                    throw new Error('Alert Corrupted!');
                }
                return newAlert
            }
        },
        addSymptom:{
            type: SymptomType,
            args:{
                symptom:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                weight:{
                    type: new GraphQLNonNull(GraphQLFloat)
                }
            },
            resolve:function(root,params){
                const symptomModel = new SymptomModel(params);
                const newSymptom = symptomModel.save();
                if(!newSymptom){
                    throw new Error('Symptoms corrupted!');
                }
                return newSymptom
            }
        },
        updatePatient:{
            type: PatientType,
            args:{
                id: {
                    name: 'id',
                    type: new GraphQLNonNull(GraphQLString)
                },
                fName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                lName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                fName:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                emergency:{
                    type: new GraphQLNonNull(GraphQLBoolean)
                },
                nurseId:{
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve:function(root,params){
                return PatientModel.findByIdAndUpdate(params.id, { emergency:params.emergency
                     }, function (err) {
                    if (err) return next(err);
                  });
            }
        }   
        
    }
  }
});

//
module.exports = new GraphQLSchema({query: queryType, mutation: mutations});

//TODO: Login mutations
