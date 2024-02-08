const blogsRouter = require('express').Router()
const blog = require('../models/blog.js')
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
  blogsRouter.delete('/', async (request, response) => {
    const body = request.body
    if(!body.id){
      return response.status(400).json({ error: 'identifier missing' })
    }
    if(body.length>1){
      return response.status(400).json({ error: 'too many identifiers' })
    }
    console.log(body.id)
    await Blog.findByIdAndRemove(body.id)
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