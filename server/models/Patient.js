const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    id: String,
    username: String,
    password: String,
    fName: String,
    lName: String,
    emergency: Boolean,
    nurseId: String
})

module.exports = mongoose.model('Patient', PatientSchema);