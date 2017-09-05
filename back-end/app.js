'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

//cargar rutass
var user_routes = require('./routes/user')
// middelwares de bod-parser
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

// configurar cabeceras y cors

// rutas base
app.use('/api', user_routes)

module.exports = app