const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
guild: String,
given_role: String,
disabled_roles: Array
})

const matchInfoModel = mongoose.model('match requirement', matchSchema)

module.exports = matchInfoModel