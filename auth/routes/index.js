var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stylesheets/style.css', (req, res) => {
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
