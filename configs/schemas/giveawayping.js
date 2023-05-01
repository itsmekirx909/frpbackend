const mongoose = require('mongoose')

const giveawayPingSchema = mongoose.Schema({
guild: String,
giveaway_ping: String
})

const giveawayPingModel = mongoose.model('giveaway ping', giveawayPingSchema)

module.exports = giveawayPingModel