const mongoose = require('mongoose')

const ticketCategoriesSchema = mongoose.Schema({
guild: String,
categories: Array
})

const ticketCategoriesModel = mongoose.model('ticket categories', ticketCategoriesSchema)

module.exports = ticketCategoriesModel