import { check, validationResult } from 'express-validator';

import Usuario  from "../models/usuarios.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/email.js";
import { where } from 'sequelize';

const formularioLogin = ( req , res ) =>{
	res.render('auth/login', {
		autenticado: false
	});
}

const formularioRegistro = ( req , res ) =>{
	res.render('auth/registro', {
		autenticado: false
	});
}

const formularioOlvidePass = ( req , res ) =>{
	res.render('auth/olvidePass', {
		pagina: 'recuperar contraseña'
	});
}

const registrar = async (req, res)=>{
	// Validaciones
	await check('nombre')
				.notEmpty()
				.withMessage('El nombre es requerido')
				.run(req);
	await check('correo')
				.notEmpty()
				.withMessage('El campo correo es requerido')
				.run(req);
	await check('password')
				.isLength({min: 8})
				.withMessage('El campo password es requerido y debe tener minimo 8 caracteres alfanumericos')
				.run(req);
	// await check('repetir_pass')
	// 			.equals('password')
	// 			.withMessage('los passwords no son iguales')
	// 			.run(req);

	let resultado = validationResult(req);

	if(!resultado.isEmpty())
		{
			return res.render('auth/registro', {
				pagina: "Registrarse",
				errores: resultado.array(),
				usuario: {
					nombre: req.body.nombre,
					correo: req.body.correo,
					password: req.body.password,
					repetir_pass: req.body.repetir_pass
				}
			});
		}

	const { nombre,  correo, password } = req.body

	// verificar correo registrado en DB
	const existeCorreo = await Usuario.findOne({where: {correo}});
	console.log(existeCorreo);
	if(existeCorreo)
	{
		return res.render('auth/registro', {
			pagina: "Registrarse",
			errores: [{msg: "el usuario ya esta registrado."}],
			usuario: {
				nombre: req.body.nombre,
				correo: req.body.correo,
				password: req.body.password,
				repetir_pass: req.body.repetir_pass
			}
		})
	}

	// almacenar usuario nuevo
	const usuarioCreado = await Usuario.create({
		nombre,
		correo,
		password,
		token: generarId(),
	});

	// enviar email
	emailRegistro({
		nombre: usuarioCreado.nombre,
		correo: usuarioCreado.correo,
		token: usuarioCreado.token
	})
	


	return res.render("templates/mensajes",{
		pagina: "usuario creado Correctamente.",
		msg: "Click aqui: Inicio de sesión"
	});

}

const confirmarCorreo = async (req, res)=>{

	const {token} = req.params;

	console.log("Token: ",token);

	const usuario = await Usuario.findOne({where: {token}});
	
	if(!usuario)
	{
		return res.render("auth/confirmarCuenta",{
			pagina: "Error al validar tu cuenta",
			mensaje: "Upss!! Algo salio mal. por favor intenta de nuevo.",
			error: true
		});
	}

	usuario.token=null;
	usuario.activo=true;
	await usuario.save();

	return res.render("auth/confirmarCuenta",{
		pagina: "Cuenta confirmada corectamente",
		mensaje: "Estas listo para iniciar sesion !!",
		error: false
	});

}

export {
	formularioLogin,
	formularioRegistro,
	formularioOlvidePass,
	registrar,
	confirmarCorreo
}