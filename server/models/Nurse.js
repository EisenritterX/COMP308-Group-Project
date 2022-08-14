const bcrypt = require('bcrypt');
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

NurseSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
})

module.exports = mongoose.model('Nurse', NurseSchema);