const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
guild: String,
match_roles: Array
})

const matchModel = mongoose.model('match role', matchSchema)

module.exports = matchModel