const mongoose = require('mongoose')

const muteRoleSchema = mongoose.Schema({
guild: String,
role: String
})

const muteRoleModel = mongoose.model('mute role', muteRoleSchema)

module.exports = muteRoleModel