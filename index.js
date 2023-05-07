require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const router = require('./configs/router/router')
const app = express()
const cors = require('cors')
port = process.env.PORT || 7000


app.use(express.json())
app.use(cors())
app.use(router)


mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('connected',1)
})
.catch((error)=>{
    console.log(error)
})

app.listen(port, ()=>{
    console.log('connected',2)
})