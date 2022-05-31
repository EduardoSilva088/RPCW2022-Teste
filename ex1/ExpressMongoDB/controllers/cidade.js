var Cidade = require('../models/cidade')
var mongoose = require("mongoose");

module.exports.list = () => {
    return Cidade
        .find({})
        .sort({id:1})
        .select({"id": 1, "nome": 1, "distrito": 1})
        .exec()
}

module.exports.getDistrito = distrito => {
    return Cidade
        .find({distrito: {$regex: distrito}})
        .exec()
}

module.exports.get = id => {
    return Cidade
        .findOne({ id: id})
        .exec()
}

module.exports.getAll = () => {
    return Cidade
        .find({})
        .exec()
}

module.exports.getOrDest = (origem, destino) => {
    return Cidade
        .find({id: {$in: [origem, destino]}})
        .exec()
}

module.exports.listNomes = () => {
    return Cidade
        .find({})
        .sort({nome:1})
        .select({"nome": 1, "_id":0})
        .exec()
}