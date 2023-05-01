const mongoose = require('mongoose')

const automodSchema = mongoose.Schema({
guild: String,
automod: Boolean
})

const automodModel = mongoose.model('automod', automodSchema)

module.exports = automodModel