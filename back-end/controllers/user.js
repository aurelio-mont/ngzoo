'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs')
var fs = require('fs')
var path = require('path')


//modelos
var User = require('../models/user')

//servicios
var jwt =require('../services/jwt')

//acciones
function pruebas(req, res) {

	res.status(200).send({
		message: 'Probando el controlador de usuarios y la accion pruebas',
		user: req.user
	})
}

function registroUser(req, res) {
	//Recojer parametros
	var params = req.body

	if (params.name && params.surname && params.email && params.password ) {
		// comprobar si existe el usuario
		User.findOne({email: params.email.toLowerCase()}, (err, issetUser) => {
			if (err) {
				res.status(500).send({message: 'Error al buscar usuario'})
			} else {
				if (!issetUser) {
					//crear el objeto del usuario a guardar
					var user = new User()
					//Asignar valores al obgeto usuario
					user.name = params.name
					user.surname = params.surname
					user.email = params.email
					user.image = null
					user.role = 'ROLE_USER'
					//cifrar el password
					bcrypt.hash(params.password, null, null, function(err, hash){
						user.password = hash
						//guardar el usuario en mongo
						user.save((err, userStored) => {
							if (err) {
								res.status(500).send({message: 'error al guardar'})
							}else{
								if (!userStored) {
									res.status(404).send({message: 'No se ha registrado el usuario'})
								}else{
									res.status(200).send({user: userStored})
								}
							}
						})

					})
				} else {
					res.status(404).send({message: 'Usuario duplicado'})
				}
			}
		})
	} else {
		res.status(500).send({message: 'Error en los datos'})
	}
}

function loginUser(req, res) {
	var params = req.body
	if (params.email && params.password) {
		var email = params.email
		var password = params.password
		// comprobar si existe el usuario
		User.findOne({email: email.toLowerCase()}, (err, issetUser) => {
			if (err) {
				res.status(500).send({message: 'Error al buscar usuario'})
			} else {
				if (issetUser) {
					bcrypt.compare(password, issetUser.password, (err, check) => {
						if (err) {
							res.status(500).send({message: 'Error al comprobar credenciales'})
						} else {
							if (check) {
								if (params.getToken) {
									//devolver token
									res.status(200).send({
										token: jwt.createToken(issetUser)
									})
								}else{
									res.status(200).send({user: issetUser})
								}	
							} else {
								res.status(404).send({message: 'Acceso denegado'})
							}
						}
					})
				} else {
					res.status(404).send({message: 'El usuario no existe'})
				}
			}
		})
	} else {
		res.status(500).send({message: 'Error en los datos'})
	}	
}

function updateUser(req, res) {
	var userId = req.params.id;
	var update = req.body
	if (userId != req.user.sub) {
			res.status(500).send({
			message: 'Acceo denegado!'
		})
	}

	User.findByIdAndUpdate(userId, update, {new: true}, (err, UserUpdated) => {
		if (err) {
			res.status(500).send({ message: 'Error al actualizar usauario!' })
		} else {
			if (!UserUpdated) {
				res.status(500).send({ message: 'Error no se ha podido actualizar usauario!' })
			} else {
				res.status(200).send({ 
					message: 'Usuario actualizado!',
					user: UserUpdated
				})
			}
		}
	})
}

function uploadUserAvatar(req, res) {
	var userId = req.params.id
	
	var file_name = 'No subido...'
	
	if (req.files) {
		var file_path = req.files.image.path
		var file_split = file_path.split('/')
		var file_name = file_split[2]
		var exp_split = file_name.split('\.')
		var file_ext = exp_split[1]

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' ) {
			if (userId != req.user.sub) {
					res.status(500).send({
					message: 'Acceo denegado!'
				})
			}
			User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, UserUpdated) => {
				if (err) {
					fs.unlink(file_path, (err) => {
						if (err) {
							res.status(403).send({ message: 'Error al actualizar usauario y archivo no eliminado!'})
						} else {
							res.status(403).send({ message: 'Error al actualizar usauario usauario!'})
						}
					})
				} else {
					if (!UserUpdated) {
						fs.unlink(file_path, (err) => {
							if (err) {
								res.status(403).send({ message: 'Error no se ha podido actualizar usauario y archivo no eliminado!'})
							} else {
								res.status(403).send({ message: 'Error no se ha podido actualizar usauario!'})
							}
						})
					} else {
						res.status(200).send({ 
							message: 'Usuario actualizado!',
							user: UserUpdated
						})
					}
				}
			})
		} else {
			fs.unlink(file_path, (err) => {
				if (err) {
					res.status(403).send({ message: 'extencion no valida y archivo no eliminado!'})
				} else {
					res.status(403).send({ message: 'extencion no valida!'})
				}
			})
			
		}			
	} else {
		res.status(403).send({ message: 'No se han subido archivos!'})
	}
}

function getAvatarFile(req, res) {
	var imageFile = req.params.imageFile
	var path_file = './uploads/users-avatars/' + imageFile

	fs.exists(path_file, (exists) => {
		if(exists){
			res.sendFile(path.resolve(path_file))
		}else {
			res.status(404).send({ message: 'la imagen no existe'})
		}
	})

	
}

module.exports = {
	pruebas,
	registroUser,
	loginUser,
	updateUser,
	uploadUserAvatar,
	getAvatarFile
}