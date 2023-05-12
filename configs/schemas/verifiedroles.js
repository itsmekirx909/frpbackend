const mongoose = require('mongoose')

const verifiedSchema = mongoose.Schema({
guild: String,
age_verified_role: String,
male_verified_role: String,
female_verified_role: String,
tnbgf_verified_role: String
})

const verifiedModel = mongoose.model('verified roles', verifiedSchema)

module.exports = verifiedModel