const mongoose = require('mongoose')

const datingSchema = mongoose.Schema({
guild: String,
male_channel: String,
female_channel: String,
nbgf_channel: String,
allowed_role: String
})

const datingModel = mongoose.model('dating sim channel', datingSchema)

module.exports = datingModel