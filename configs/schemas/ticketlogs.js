const mongoose = require('mongoose')

const ticketslogSchema = mongoose.Schema({
guild: String,
tickets_logs_channel: String
})

const ticketslogModel = mongoose.model('tickets logs channel', ticketslogSchema)

module.exports = ticketslogModel