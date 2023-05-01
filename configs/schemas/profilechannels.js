const mongoose = require('mongoose')

const profileChannelsSchema = mongoose.Schema({
guild: String,
profiles_channel: String
})

const profileChannelsModel = mongoose.model('profile channel', profileChannelsSchema)

module.exports = profileChannelsModel