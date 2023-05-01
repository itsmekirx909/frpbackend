const mongoose = require('mongoose')

const warningslogSchema = mongoose.Schema({
guild: String,
warnings_logs_channel: String
})

const warningslogModel = mongoose.model('warnings logs channel', warningslogSchema)

module.exports = warningslogModel