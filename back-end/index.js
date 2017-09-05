'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var port = process.env.PORT || 3789


mongoose.connect('mongodb://localhost:27017/zoo',{ useMongoClient: true})
				.then(()=> {
					console.log('Coneccion exitosa a la BD zoo')
					app.listen(port, () => {
						console.log('El servidor local esta corriendo correctamente....')
					})
				})
				.catch(err => console.log(err))
