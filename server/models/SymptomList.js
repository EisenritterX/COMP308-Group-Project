// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomListSchema = new Schema({
    id: String,
    symptom: String,
    weight: Number
});
module.exports = mongoose.model('Symptom', SymptomListSchema)
