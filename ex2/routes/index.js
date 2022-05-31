var express = require('express');
var router = express.Router();
var axios = require('axios')


const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxODI4OCwiZXhwIjoxNjU0MDQ3MDg4fQ.r8Na53pwfYGuqXDn_bszrE7zRxqhxfVMqzfbQY8UdWuhfbrIrlIkKSMIWpK5hOLwUEjgBH9G3Nq2xIzwgMYT_Gj_NdNXlHiKTQ11ZwdCZmad1R7Jo0RvGGWcwmkGbkKYO5S-Nk988QjHRdfiIHCzbPqWKMDbqL9dpVGuEZ06LzZ9jjFTSlkQStfYMZvZmEHTEkieEwZa1pVUjX0uG1tBADQMKUBb9gMzbHTAhk36Uh8X3Z7Llui0dja7Gj2lZF_IIoqaXRk12Gy3P0jlPvwNFQa1BuyhflbL4qw7RLkGcXcGhBlhFL-L3HPWAmm8srRXDAzpmXrN0WFhY-ukjYSGyQ"

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
    .catch(error => {
      res.render('error', {error:error});
    });
});


router.get('/classe', function(req, res, next) {
  axios.get(`http://clav-api.di.uminho.pt/v2/classes?token=${TOKEN}&nivel=1`)
    .then((resp => {
      var classes = resp.data;
      res.render('classes', {
        items:classes
      });
    }))
    .catch(error => {
      res.render('error', {error:error});
    });
});

router.get('/termos', function(req, res, next) {
  axios.get(`http://clav-api.di.uminho.pt/v2/termosIndice?token=${TOKEN}`)
    .then((resp => {
      var termos = resp.data;
      res.render('termos', {
        items:termos
      });
    }))
    .catch(error => {
      res.render('error', {error:error});
    });
});

router.get('/classe/:codigo', function(req, res, next) {
  axios
  .get(`http://clav-api.di.uminho.pt/v2/classes/c${req.params.codigo}?token=${TOKEN}`)
  .then((response) => {
    var classe = response.data;
    res.render('classe', {
      classe: classe,
    });
  })
  .catch((err) => {
    res.render("error", { error: err });
  });
});



module.exports = router;
