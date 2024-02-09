const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog.js')
const api = supertest(app)
initialBlogs = [
{ title: 'kerran kesässä',
  author: 'tommi korpi',
  url: 'no url',
  likes: 3
},
{
  title: 'oli kerran elämä',
  author: 'janne joki',
  url: 'no url',
  likes: 10
},
{
  title: 'oei ollut',
  author: 'mikka',
  url: 'no url',
  likes: 10
}
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
  })
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})
test('blogs identifier should be named id', async ()=> {
  const response = await api.get('/api/blogs')
  const id =response._body.map(blog=>blog.id)
  expect(id).toBeDefined()
})
test('post adds a new blog',async () => {
  const newblog = {
    title: 'ei ollutkaan elämää',
    author: 'janne joki',
    url: 'no url',
    likes: 4
  }
  await api.post('/api/blogs').send(newblog)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length+1)
})
test('if likes has no value it is set to 0', async()=>{
  const newblog = {
    title: 'ei tykkäyksiä',
    author: 'janne joki',
    url: 'no url',
  }
  await api.post('/api/blogs').send(newblog)
  const response = await api.get('/api/blogs')
  const body = response.body
  const addedblog=body.filter(blog => blog.title === 'ei tykkäyksiä')
  expect(addedblog.likes === 0)
})
test('if no url is given for a blog response should be 400', async()=> {
  const newblog = {
    title: 'ei tykkäyksiä',
    author: 'janne joki'
  }
  await api.post('/api/blogs').send(newblog)
  .expect(400)
})
test('if no title is given response should be 400', async()=>{
    const newblog = {
    author: 'janne joki',
    url: 'no url'
  }
  await api.post('/api/blogs').send(newblog)
  .expect(400)
})
test('delete blog with correct id', async()=>{
  console.log(initialBlogs)
  await api.delete('/api/blogs').send(initialBlogs[1].id)
  const response = await api.get('/api/blogs')
  const body = response.body
  const afterDeletion=body.filter(blog => blog.id === initialBlogs[1].id)
  expect(afterDeletion.length==0)
})
test('update blog author correctly',async()=>{
  const newblog = {
    author: 'janne joki',
    url: 'no url',
    id:initialBlogs[0]
  }
  await api.put('/api/blogs').send(newblog)
  const response = await api.get('/api/blogs')
  const body = response.body
  const afterUpdate=body.filter(blog => blog.id === initialBlogs[0].id)
  expect(afterUpdate.author==="janne joki")
})
test('update blog likes correctly',async()=>{
  const newblog = {
    author: 'janne joki',
    url: 'no url',
    id:initialBlogs[0],
    likes:6
  }
  await api.put('/api/blogs').send(newblog)
  const response = await api.get('/api/blogs')
  const body = response.body
  const afterUpdate=body.filter(blog => blog.id === initialBlogs[0].id)
  expect(afterUpdate.likes===6)
})

afterAll(async () => {
  await mongoose.connection.close()
})