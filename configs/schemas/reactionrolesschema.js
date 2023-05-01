const mongoose = require('mongoose')

const reactionRolesSchema = mongoose.Schema({
guild: String,
data: Array
})

const reactionRolesModel = mongoose.model('reaction role', reactionRolesSchema)

module.exports = reactionRolesModel