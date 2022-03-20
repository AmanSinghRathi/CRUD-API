const express = require('express')
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://localhost:27017/UserManagement', {useNewUrlParser: true});
const conn = mongoose.connection

conn.on('open', ()=>{
    console.log('connected..')
})

app.use(express.json());

const userRouters = require('./routes/user')
app.use('/user', userRouters)

app.listen(3000, ()=>{
    console.log('server started..')
})