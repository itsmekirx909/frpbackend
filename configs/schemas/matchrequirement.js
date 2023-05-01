const mongoose = require('mongoose')

const requiredMatchSchema = mongoose.Schema({
guild: String,
required_roles: Array
})

const requiredMatchModel = mongoose.model('match required role', requiredMatchSchema)

module.exports = requiredMatchModel