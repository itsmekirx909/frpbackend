const mongoose = require('mongoose')

const profileChannelsSchema = mongoose.Schema({
guild: String,
male_profiles_channel: String,
female_profiles_channel: String,
tnbg_profiles_channel: String
})

const profileChannelsModel = mongoose.model('profile channel', profileChannelsSchema)

module.exports = profileChannelsModel