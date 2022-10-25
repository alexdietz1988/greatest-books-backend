const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const controllers = require('./controllers')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, you have reached the Greatest Books backend')
})

app.use('/account', controllers.account)
app.use('/book', controllers.book)

app.listen(PORT, () => console.log('listening on PORT ' + PORT))