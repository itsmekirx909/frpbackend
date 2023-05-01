const mongoose = require('mongoose')

const rulesScehma = mongoose.Schema({
guild: String,
rules: Array
})

const rulesModel = mongoose.model('rule', rulesScehma)

module.exports = rulesModel