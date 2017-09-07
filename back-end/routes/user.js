'use strict'

var express = require('express')
var UserController = require('../controllers/user')

var api = express.Router()
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/users-avatars' })

api.get('/pruebas-de-controlador', md_auth.ensureAuth, UserController.pruebas)
api.post('/registro', UserController.registroUser)
api.post('/login', UserController.loginUser)
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser)
api.post('/upload-avatar-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadUserAvatar)
api.get('/get-avatar-file/:imageFile',UserController.getAvatarFile)
api.get('/keepers',UserController.getKeepers)


module.exports = api