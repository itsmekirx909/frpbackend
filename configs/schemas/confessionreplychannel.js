const mongoose = require('mongoose')

const confessionReplyChannelSchema = mongoose.Schema({
guild: String,
confession_reply_channel: String
})

const confessionReplyChannelModel = mongoose.model('confession reply channel', confessionReplyChannelSchema)

module.exports = confessionReplyChannelModel