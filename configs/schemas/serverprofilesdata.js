const mongoose = require('mongoose')

const serverProfilesSchema = mongoose.Schema({
guild: String,
required_roles: Array
})

const serverProfilesModel = mongoose.model('profile required role', serverProfilesSchema)

module.exports = serverProfilesModel