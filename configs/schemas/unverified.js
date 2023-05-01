const mongoose = require('mongoose')

const unverifiedSchema = mongoose.Schema({
guild: String,
unverified_role: String
})

const unverifiedModel = mongoose.model('unverified role', unverifiedSchema)

module.exports = unverifiedModel