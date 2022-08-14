const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NurseSchema = new Schema ({
    id: String,
    username: String,
    password: String,
    fName: String,
    lName: String,
    patientId: String
})

module.exports = mongoose.model('Nurse', NurseSchema);