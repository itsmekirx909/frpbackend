const mongoose = require('mongoose')

const nsfwChannelSchema = mongoose.Schema({
guild: String,
nsfw_channel: String
})

const nsfwChannelModel = mongoose.model('nsfw channel', nsfwChannelSchema)

module.exports = nsfwChannelModel