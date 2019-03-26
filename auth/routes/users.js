var express = require('express');
var router = express.Router();
const UserModel = require('../models/user')
const fs = require('fs')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login')
});


router.get('/registo', function(req, res, next) {
  res.render('registo')
});

router.get('/s1/stylesheets/style.css', (req, res) => {
  console.log('OLha eu aqui!!!')
  console.log(__dirname + '../public/stylesheets/w3.css')
  fs.readFile(__dirname + '/../public/stylesheets/style.css', (erro,dados) => {
    if(!erro)
        res.write(dados)
    else
        console.log('<p><b>Erro: </b> ' + erro + '</p>')
    res.end()    
  })
})

module.exports = router;
