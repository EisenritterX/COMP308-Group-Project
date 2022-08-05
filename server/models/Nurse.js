const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NurseSchema = new Schema ({
    id: String,
    fName: String,
    lName: String,

    //if one to one relationship
    patientId: String

    // if one to many relationship with the patient
    // patients: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Patient"
    // }]
})

module.exports = mongoose.model('Nurse', NurseSchema);