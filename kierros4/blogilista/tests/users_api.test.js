const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user.js')
const api = supertest(app)
initialUsers = [
    { username: 'mikko124412',
    password: '4124551235151',
      name: 'mikko laapas'
    },
    {
      username: 'villevallaton',
      password: '151251251251',
      name: 'ville vallaton'
    },
    {
      username: 'jarnoXD',
      password: '154151251',
      name: 'jarno joki'
    }
    ]
    beforeEach(async () => {
        await User.deleteMany({})
        let userObject = new User(initialUsers[0])
        await userObject.save()
        userObject = new User(initialUsers[1])
        await userObject.save()
        userObject = new User(initialUsers[2])
        await userObject.save()
      })
    test('users are returned as json', async () => {
        await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
      test('no user with same name can be made', async () => {
        const newuser ={
            username: 'jarnoXD',
            password: '154151251',
            name: 'jarno joki'
        }
        const response = await api.post('/api/users').send(newuser);
        // code should be 400
        expect(response.status).toBe(400);
        // error message should be "username must be unique"
        expect(response.body.error).toBe('username must be unique');
      })
      test('user with bad password cant be made', async () => {
        const newuser ={
            username: 'mikael',
            password: '15',
            name: 'jarno joki'
        }
        const response = await api.post('/api/users').send(newuser);
        // code should be 400
        expect(response.status).toBe(400);
        // error message should be "username and password must be atleas 3 characters long"
        expect(response.body.error).toBe('username and password must be atleas 3 characters long');
      })
      test('user with bad username cant be made', async () => {
        const newuser ={
            username: 'vi',
            password: '1515',
            name: 'jarno joki'
        }
        const response = await api.post('/api/users').send(newuser);
        // code should be 400
        expect(response.status).toBe(400);
        // error message should be "username and password must be atleas 3 characters long"
        expect(response.body.error).toBe('username and password must be atleas 3 characters long');
      })
      test('user with good credentials can be made', async () => {
        const newuser ={
            username: 'uusikäyttäjä',
            password: '151512451',
            name: 'ukko pekka'
        }
        const response = await api.post('/api/users').send(newuser);
        // code should be 400
        expect(response.status).toBe(201);
        // usernames should be equal
        expect(response.body.username).toBe(newuser.username);
      })
      
