const mongoose = require('mongoose')

const kmbulogSchema = mongoose.Schema({
guild: String,
kmbu_logs_channel: String
})

const kmbulogModel = mongoose.model('kmbu logs channel', kmbulogSchema)

module.exports = kmbulogModel