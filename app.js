// Se encarga de nuestra conexion al servidor
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

// Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Otras configuraciones
app.use(cors())
app.use(helmet())
app.use(morgan())

// Routes
app.use(require('./routes/authRoute'))
app.use(require('./routes/petRoute'))
app.use(require('./routes/appointmentRoute'))

module.exports = app;