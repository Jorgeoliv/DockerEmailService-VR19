var express = require('express');
var router = express.Router();
const axios = require('axios')
const querystring = require('querystring')
const nodemailer = require('nodemailer')

const containerAuth = "autenticacao"

const transporter = nodemailer.createTransport({
    // In Node, environment variables are available on process.env
    host: process.env.MAILDEV_PORT_25_TCP_ADDR, // ex. 172.17.0.10
    port: process.env.MAILDEV_PORT_25_TCP_PORT, // ex. 25
    // We add this setting to tell nodemailer the host isn't secure during dev:
    ignoreTLS: true
    // service: 'gmail',
    // auth: {
    //        user: 'jorge10oliveira@gmail.com',
    //        pass: 'password'
    //    }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3000/users')
});

router.get('/enviaEmail', function(req, res, next) {
  console.dir(req.query.token)
  //res.jsonp(req.query.token)
  console.log('VOU ENVIAR O EMAILLLLLL!!')
  axios.get('http://' + containerAuth + ':3000/api/users/info?token=' + req.query.token)
    .then(mail =>{
      console.dir(mail)
      res.render('compositor',{info: mail.data})
    })//recebe o mail com que o login foi feito
    .catch(erroVerificacao =>{
      console.log("ERRO NA CONFIRMAÇÃO DO TOKEN:" + erroVerificacao)
    })
});

router.get('/teste', (req, res) => {

  let mailOptions = {
    from: 'jorge10oliveira@gmail.com', // sender address
    to: 'jorge10oliveira@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  }

  // Now when your send an email, it will show up in the MailDev interface
  transporter.sendMail(mailOptions, (error, info) => {
    if(error)
      console.log(error)
    else
      console.log(info)
  })
})

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
