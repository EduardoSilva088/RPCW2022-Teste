var express = require('express');
var router = express.Router();

var Cidade = require('../controllers/cidade')
var Ligacao = require('../controllers/ligacao')

/* GET home page. */
router.get('/cidades', function(req, res, next) {
  if (req.query.distrito) {
    Cidade.getDistrito(req.query.distrito)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({error: e}))
  } else {
    Cidade.list()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(502).jsonp({error: e}))
  }
});

router.get('/cidades/nomes', function(req, res, next) {
  Cidade.listNomes()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(503).jsonp({error: e}))
});

router.get('/cidades/:id', function(req, res, next) {
  Cidade.get(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(504).jsonp({error: e}))
});

router.get('/distritos', function(req, res, next) {
  Cidade.getAll()
    .then(dados => {
        var struct = {}

        dados.forEach(cidade => {
          var distrito = cidade.distrito
          if (!(distrito in struct)){
            struct[distrito] = [{id: cidade.id, nome: cidade.nome}]
          }
          else {
            struct[distrito].push({id: cidade.id, nome: cidade.nome})
          }
        });
        res.status(200).jsonp(struct)
      })
    .catch(e => res.status(505).jsonp({error: e}))
});

router.get('/ligacoes', function(req, res, next) {
  if (req.query.origem) {
    Ligacao.getListOrigem(req.query.origem)
      .then(dados => {
          var struct = []
          let promessas = []
          dados.forEach(ligacao => {
            promessas.push(Cidade.get(ligacao.destino))
            struct.push({id: ligacao.id})
          });
          Promise.all(promessas)
            .then(dados => {
              let i = 0
              dados.forEach(d => {
                struct[i] = {...struct[i],idDestino: d.id, nomeDestino:d.nome}
                i++
              })
              console.log(struct);
              res.status(200).jsonp(struct)
            })
      })
      .catch(e => res.status(506).jsonp({error: e}))
  } else if (req.query.dist) {
      Ligacao.getListDist(req.query.dist)
        .then(dados => {
          var struct = []
          let promessas = []
          dados.forEach(ligacao => {
            promessas.push(Cidade.getOrDest(ligacao.destino, ligacao.origem))
            struct.push({id: ligacao.id})
          });

          Promise.all(promessas)
            .then(destinos => {
              let i = 0
              destinos.forEach(d => {
                struct[i] = {...struct[i], idOrigem: d[0].id, nomeOrigem:d[0].nome, idDestino: d[1].id, nomeDestino:d[1].nome}
                i++
              })
              res.status(200).jsonp(struct)
            })
        })
  }
});

module.exports = router;