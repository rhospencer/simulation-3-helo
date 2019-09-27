require('dotenv').config()
const express = require('express')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING} = process.env

const ctrl = require('./controller')


const app = express()

app.use(express.json())

// ENDPOINTS
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.get('/api/posts/:id', ctrl.getPosts)
app.get('/api/post/:id', ctrl.getSinglePost)



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})
