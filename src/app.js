const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const { errorLogger } = require('./middleware/errorLogger')
require('dotenv').config()

const app = express()
const port = process.env.PORT
const routes = require('./routes/routes')

// catching all exceptions
winston.exceptions.handle(new winston.transports.File({filename: 'exceptions.log'}))
process.on('unhandledRejection', (ex)=>{
    throw ex;
})

// setting up middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// routes
app.use('/api/note/v1', routes)
// error middleware
app.use(errorLogger)

const server = app.listen(port, ()=>{
    console.log(`Note book API server initiated on port: ${port}`);
})