const mongoose = require('mongoose')

const applicationsChannelSchema = mongoose.Schema({
guild: String,
application_channel: String
})

const applicationsChannelModel = mongoose.model('application channel', applicationsChannelSchema)

module.exports = applicationsChannelModel