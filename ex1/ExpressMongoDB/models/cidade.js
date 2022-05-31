const mongoose = require('mongoose')

var cidadeSchema = new mongoose.Schema({
    id: String, 
    nome: String,
    população: Number,
    descrição: String,
    distrito: String
})


module.exports = mongoose.model('cidade', cidadeSchema, "cidades")