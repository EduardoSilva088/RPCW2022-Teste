var Ligacao = require('../models/ligacao')
var mongoose = require("mongoose");

module.exports.getListOrigem = origem => {
    return Ligacao
        .find({origem: origem})
        .exec()
}

module.exports.getListDist = dist => {
    return Ligacao
        .find({"distância": {$gte : dist}})
        .exec()
}