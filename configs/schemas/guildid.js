const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
guild: String
})

const guildModel = mongoose.model('guild', guildSchema)

module.exports = guildModel