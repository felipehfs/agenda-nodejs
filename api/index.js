const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const { secret } = require('./.env')
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())


app.use(function(req, res, next){
    if(req.headers && req.headers.authorization 
        && req.headers.authorization.split(' ')[0] === 'Bearer'){
            jwt.verify(req.headers.authorization.split(' ')[1], secret, function(err, decode){
                if(err) req.user = undefined;
                if (new Date(decode.exp * 1000) > new Date()){
                    req.user = decode 
                    next()
                } else {
                    res.status(401).send("Session expired")
                }
            })
    } else {
        req.user = undefined
        next()
    }
})

const contactHandler = require('./controllers/contactHandler')
const userHandler = require('./controllers/userHandler')

app.post('/register', userHandler.register)
app.post('/signin', userHandler.signIn)

app.post('/contacts', userHandler.loginRequired, contactHandler.create)
app.get('/contacts', userHandler.loginRequired, contactHandler.retrieve)
app.delete('/contacts/:id', userHandler.loginRequired, contactHandler.delete)
app.get('/contacts/:id', userHandler.loginRequired, contactHandler.findById)
app.put('/contacts/:id', userHandler.loginRequired, contactHandler.update)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))