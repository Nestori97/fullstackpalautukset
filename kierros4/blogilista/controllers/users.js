const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const user = require('../models/user')
usersRouter.get('/', async(request,response) => {
    const users = await User.find({})
    response.json(users)
})
usersRouter.post('/', async (request, response) => {
    const body = request.body
    const users = await User.find({})
    const saltRounds = 10
    if(!body.password || !body.username){
        return response.status(400).json({error: "username or password missing"})
    }
    console.log(body.username)
    console.log(body.username.length)

    if(body.password.length<3 || body.username.length <3 ){
        return response.status(400).json({error: "username and password must be atleas 3 characters long"})
    }
    const areThereSameNamedUser =users.map(user => user.username === body.username).filter(isittrue => isittrue=== true)
    if(areThereSameNamedUser.length>0){
        return response.status(400).json({error: "username must be unique"})
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
        username: body.username,
        passwordHash: passwordHash,
        name: body.name
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})
module.exports = usersRouter