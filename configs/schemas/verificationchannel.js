const mongoose = require('mongoose')

const verificationChannelSchema = mongoose.Schema({
guild: String,
verification_channel: String
})

const verificationChannelModel = mongoose.model('verification channel', verificationChannelSchema)

module.exports = verificationChannelModel