const mongoose = require('mongoose')

const genderSchema = mongoose.Schema({
guild: String,
male_role: String,
female_role: String,
tnbgf_role: String
})

const genderModel = mongoose.model('gender roles', genderSchema)

module.exports = genderModel