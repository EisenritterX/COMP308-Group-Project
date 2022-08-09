// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientReport = new Schema({
    id: String,
    patientId: String,
    nurseId: String,
    bodyTemperature: Number,
    heartRate: Number,
    bloodPressure: Number,
    respiratoryRate:Number,
    dateFiled:Date
});
module.exports = mongoose.model('PatientReport', PatientReport)
