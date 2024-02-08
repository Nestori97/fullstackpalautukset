const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs =await Blog.find({})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
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
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes
    })
  
    const result = await blog.save()
    response.status(201).json(result)
  })
  module.exports = blogsRouter