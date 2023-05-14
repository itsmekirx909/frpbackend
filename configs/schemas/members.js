const mongoose = require('mongoose')

const membersSchema = mongoose.Schema({
guild: String,
members_join_logs_channel: String,
members_leave_logs_channel: String
})

const membersModel = mongoose.model('members logs channel', membersSchema)

module.exports = membersModel