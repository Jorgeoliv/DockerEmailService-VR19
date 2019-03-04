const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/user')
const axios = require('axios')

const router = express.Router()

//Devolve a lista de utilizadores
router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        UserModel.find()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).send('Erro na istagem de utilizadores'))
    }
)


router.get('/token', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('So para confirmar que entrei auqi')
    res.jsonp(req.session.token)
})

//Devolve a lista de utilizadores
router.get('/:uid', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        console.log('INFO DA SESSION!!!!!')
        console.dir(req.session)
        UserModel.findOne({email: req.params.uid})
            .then(dados => res.jsonp(req.session.token))
            .catch(erro => res.status(500).send('Erro na istagem de utilizadores'))
    }
)

//Registo de um utilizador
router.post('/', passport.authenticate('registo', {session: false,
    successRedirect: '/users/login',
    failureRedirect: '/users'    
}))

//Login
router.post('/login', async(req, res, next) => {
    console.log('Eu chegei ao login')
    console.log('lalalala')
    passport.authenticate('login', async(err, user, info) => {
        console.log("AQUIII")
        try{
            if(err || !user){
                if(err)
                    return next(error)
                else
                    return next(new Error('Utilizador inexistente'))
            }
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error)
                //vou usar isto como payload
                var myuser = {_id: user._id, email: user.email}
                var token = jwt.sign({user: myuser}, 'dweb2018')
                req.session.token = token
                console.log('O token é: ' + token)
                console.dir(token)
                console.log('=======================')
                console.log('O utilizador é: ')
                console.dir(myuser)
                res.redirect('/api/users/' + user.email)
            })
        }
        catch(error) {
            return next(error)
        }
    })(req, res, next)
})

module.exports = router