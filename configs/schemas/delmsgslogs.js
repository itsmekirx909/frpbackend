const mongoose = require('mongoose')

const delmsgslogSchema = mongoose.Schema({
guild: String,
message_delete_logs_channel: String
})

const delmsgslogModel = mongoose.model('message delete logs channel', delmsgslogSchema)

module.exports = delmsgslogModel