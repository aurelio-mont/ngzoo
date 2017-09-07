'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'clave_secreta_del_curso_de_angular4_avanzado'

exports.ensureAuth = function(req, res, next) {
	if (!req.headers.authorization) { 
		return res.status(403).send({message: 'No se han recibido los datos!'})
	}
	var token = req.headers.authorization.replace(/['"]+/g, '')
	try{
		var payload = jwt.decode(token, secret)
		if (payload.exp <= moment.unix()) { 
			return res.status(401).send({message: 'Su sesion ha expirado!'})
		}
	}catch (ex){
		return res.status(404).send({message: 'token invalido!'})
	}

	req.user = payload;

	next();
}