const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    id: String,
    fName: String,
    lName: String,
    emergency: Boolean,
    nurseId: String
})

module.exports = mongoose.model('Patient', PatientSchema);