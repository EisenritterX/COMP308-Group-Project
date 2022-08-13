// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmergencyAlertSchema = new Schema({
    id: String,
    patientId: String,
    responderId: String,
    nurseId: String
});
module.exports = mongoose.model('EmergencyAlert', EmergencyAlertSchema)
