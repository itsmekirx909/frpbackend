const mongoose = require('mongoose')

const ageSchema = mongoose.Schema({
guild: String,
age_18: String,
age_19: String,
age_20: String,
age_21: String,
age_22: String,
age_23: String,
age_24: String,
age_25: String,
age_26: String,
age_27: String,
age_28: String,
age_29: String,
age_30: String,
age_31: String,
})

const ageModel = mongoose.model('age roles', ageSchema)

module.exports = ageModel