const express = require('express')

const app = express()

const validator = require('../index')
const testValidator = require('./validator-test')

app.use(express.json())

app.post('/test', validator(testValidator), (req, res, next) => {
    res.status(200).send('It Works')
    next()
})

app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        res.status(400).send('Validation Error')
        next()
    }
})

app.listen(3000, () => {
    console.log('Application is Listening')
})