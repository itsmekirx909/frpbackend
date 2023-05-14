const mongoose = require('mongoose')

const cmSchema = mongoose.Schema({
guild: String,
confessions_logs_channel: String,
match_logs_channel: String
})

const cmModel = mongoose.model('confession and match logs channel', cmSchema)

module.exports = cmModel