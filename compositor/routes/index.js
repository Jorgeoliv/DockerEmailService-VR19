var express = require('express');
var router = express.Router();
const axios = require('axios')
const querystring = require('querystring')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3000/users/login')
});

router.get('/enviaEmail', function(req, res, next) {
  console.dir(req.query.token)
  //res.jsonp(req.query.token)
  axios.get('http://localhost:3000/api/users/info?token=' + req.query.token)
    .then(mail =>{
      console.dir(mail)
      res.render('compositor',{info: mail.data})
    })//recebe o mail com que o login foi feito
    .catch(erroVerificacao =>{
      console.log("ERRO NA CONFIRMAÇÃO DO TOKEN")
    })
});

// axios.get('http://localhost:3000/users/info?token=' + req.query.token)
// .then(mail =>{

// })//recebe o mail com que o login foi feito
// .catch(erroVerificacao =>{
//   console.log("ERRO NA CONFIRMAÇÃO DO TOKEN"))
// })
// console.log('EU ESTOU AQUI AAQUI PARA TE DIZER')
// axios.get('http://localhost:3000/users/login')
//   .then(dados => res.jsonp('Olha um token a sair: ' + dados))
//   .catch(erro => res.jsonp(erro))
// //res.render('index', { title: 'Express' });

module.exports = router;
