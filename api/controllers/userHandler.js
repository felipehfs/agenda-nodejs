const User = require('../models/user')
const {secret} = require("../.env")
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

exports.register = async function(req, res) {
    try{
        const newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        const savedUser = await newUser.save()
        savedUser.hash_password = undefined
        res.json(savedUser)
    } catch(err) {
        res.status(500).send(err)
    }
}

exports.signIn = async function(req, res) {
    try{
        
        if (!req.body.email || !req.body.password){
            return res.status(400).send("Informe o email ou a senha")
        }
        const user = await User.findOne({ email: req.body.email})
        if (!user) return res.status(401).send("Usuário não encontrado!")
        const isMatched = bcrypt.compareSync(req.body.password, user.hash_password)
        if (!isMatched) return res.status(401).send("Email/Senha inválido!")

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            iat: now,
            exp: now + (60 * 60 *24 * 7)
        }
        
        res.json({
            ...payload,
            token: jwt.encode(payload, secret)
        })   
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user'})
    }
}