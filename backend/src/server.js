const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const path = require('path')

mongoose.connect('mongodb+srv://awd:awd@cluster0-bup7v.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(3333);