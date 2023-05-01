const mongoose = require('mongoose')

const suggestionChannelSchema = mongoose.Schema({
guild: String,
suggestion_channel: String
})

const suggestionChannelModel = mongoose.model('suggestion channel', suggestionChannelSchema)

module.exports = suggestionChannelModel