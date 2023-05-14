const mongoose = require('mongoose')

const otherLogsSchema = mongoose.Schema({
guild: String,
misc_logs_channel: String,
boosts_logs_channel: String
})

const otherLogsModel = mongoose.model('misc and boosts logs channel', otherLogsSchema)

module.exports = otherLogsModel