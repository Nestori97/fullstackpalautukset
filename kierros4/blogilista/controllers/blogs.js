const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs =await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    if(!body.token){
      return response.status(400).json({ error: 'no token' })
    }
    const decodedToken = jwt.verify(body.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    let likes
    if(body.likes){
        likes = body.likes
      }
    else {
       likes = 0
    }
    if(!body.title || !body.url){
      return response.status(400).json({ error: 'Title or URL is missing' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })
  
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  })
  blogsRouter.delete('/', async (request, response) => {
    const body = request.body
    if(!body.token){
      return response.status(400).json({ error: 'no token' })
    }
    const decodedToken = jwt.verify(body.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    if(!body.id){
      return response.status(400).json({ error: 'identifier missing' })
    }
    if(body.length>1){
      return response.status(400).json({ error: 'too many identifiers' })
    }
    const founduser= await Blog.findById(body.id)
    if(founduser === null){
      return response.status(400).json({ error: 'that user does not exist' })
    }
    const userid =founduser.user.toString()
    if(decodedToken.id.toString()!==userid){
      return response.status(400).json({ error: 'the token resolved to wrong id and did not match the user id' })
    }
    await Blog.findByIdAndRemove(userid)
    response.status(204).end()

  })
  blogsRouter.put('/', async (request, response) => {
    const body = request.body
    let likes
    if(body.likes){
        likes = body.likes
      }
    else {
       likes = 0
    }
    if(!body.title || !body.url){
      return response.status(400).json({ error: 'Title or URL is missing' })
    }
    const blog = {
      title: body.title,
      author: body.author,
      likes:likes,
      url:body.url
    }
    const updatedBlog = await Blog.findByIdAndUpdate(body.id,blog,{ new: true })
    response.json(updatedBlog)
  })
  module.exports = blogsRouter