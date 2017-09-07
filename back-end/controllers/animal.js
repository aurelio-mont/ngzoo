'use strict'
//modulos
var fs = require('fs')
var path = require('path')

//modelos
var User = require('../models/user')
var Animal = require('../models/animal')

//acciones
function pruebas(req, res) {

	res.status(200).send({
		message: 'Probando el controlador de animal y la accion pruebas',
		user: req.user
	})
}

function saveAnimal(req, res) {
	
	var params = req.body

	if (params.name) {
		var animal = new Animal()

		animal.name = params.name
		animal.description = params.description
		animal.year = params.year
		animal.image = null
		animal.user = req.user.sub

		animal.save((err, animalStored) => {
			if (err) {
				res.status(500).send({message: 'error al guardar'})
			}else{
				if (!animalStored) {
					res.status(404).send({message: 'No se ha registrado el animal'})
				}else{
					res.status(200).send({animal: animalStored})
				}
			}
		})
	}else {
		res.status(200).send({
			message: 'No se recibio el nombre del animal'
		})
	}


	
}

module.exports = {
	pruebas,
	saveAnimal
}