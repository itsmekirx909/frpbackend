const mongoose = require('mongoose')

const confessionChannelSchema = mongoose.Schema({
guild: String,
confession_channel: String
})

const confessionChannelModel = mongoose.model('confession channel', confessionChannelSchema)

module.exports = confessionChannelModel