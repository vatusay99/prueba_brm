import { check, validationResult } from 'express-validator';
import bcrypt, { genSalt } from 'bcrypt';

import Usuario  from "../models/usuarios.js";
import { GenerarJWT, generarId } from "../helpers/tokens.js";
import { emailRegistro, emailOlvideContraseña } from "../helpers/email.js";
import { where } from 'sequelize';

const formularioLogin = ( req , res ) =>{
	res.render('auth/login', {
		autenticado: false
	});
}

const autenticar = async (req, res)=>{
	
	await check('correo')
				.isEmail()
				.withMessage('* El campo correo es requerido')
				.run(req);
	await check('pass')
				.notEmpty()
				.withMessage('* El campo password es requerido')
				.run(req);
	
	let resultado = validationResult(req);

	if(!resultado.isEmpty())
	{
		return res.render('auth/login', {
			pagina: "Inicio de sesión",
			errores: resultado.array(),
		});
	}

	const { correo, pass } = req.body;

	const usuario = await Usuario.findOne({where: {correo}});
	if(!usuario)
	{
		return res.render('auth/login', {
			pagina: "Inicio de sesión",
			errores: [{msg: "El usuario no se encontro... valide e intente de nuevo."}]
		});
	}

	if(!usuario.activo)
	{
		return res.render('auth/login', {
			pagina: "Inicio de sesión",
			errores: [{msg: "El usuario no se encuenta activo."}]
		});	
	}

	// validar pass
	if(!usuario.verificarPassword(pass))
	{
		return res.render('auth/login', {
			pagina: "Inicio de sesión",
			errores: [{msg: "El password no es correcto."}]
		});	
	}
	
	// autenticar al usuario
	const token = GenerarJWT(usuario.id);

	// almacenar token en cookies
	return res.cookie('_token', token, {
		httpOnly: true,

	}).redirect('/mis-productos');


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
				.isEmail()
				.withMessage('El campo correo es requerido')
				.run(req);

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

const resetPassword = async (req, res)=>{
	// Validaciones
	await check('correo').isEmail().withMessage('El campo correo es requerido').run(req);

	let resultado = validationResult(req);

	if(!resultado.isEmpty())
	{
		return res.render('auth/olvidePass', {
			pagina: "Recuperar contraseña",
			msg: 'El campo correo no es un correo valido.',
			errores: resultado.array(),
		});
	}

	const { correo } = req.body

	const usuario = await Usuario.findOne({where: {correo}});

	if(!usuario)
	{
		return res.render('auth/olvidePass', {
			pagina: "Recuperar contraseña",
			errores: [{msg: 'El campo correo no pertenece a ningun usuario.'}],
		});
	}

	// generar token y enviar Email
	usuario.token = generarId();
	await usuario.save();

	emailOlvideContraseña({
		correo: usuario.correo,
		nombre: usuario.nombre,
		token: usuario.token
	});

	return res.render('templates/mensajes', {
		pagina: "Cambiar contraseña",
		mensaje: 'se envio un correo con los pasos para el restablecimiento de tu contraseña',
		msg: "Inicio de sesión"
	});


}

const comprobarToken = async (req, res)=>{

	const {token} = req.params;
	const usuario = await Usuario.findOne({where:{token}});
	if(!usuario)
	{
		return res.render("auth/confirmarCuenta",{
			pagina: "Error al validar tu cuenta",
			mensaje: "Upss!! Algo salio mal. no es posible restablecer tu contraseña, contacta con el administrador.",
			error: true
		});
	}

	return res.render("auth/reset-password",{
		pagina: "Restablecer tu contraseña",
	});


}

const nuevaContraseña = async (req, res)=>{
	await check('password')
				.isLength({min: 8})
				.withMessage('El campo password es requerido y debe tener minimo 8 caracteres alfanumericos')
				.run(req);

	let resultado = validationResult(req);

	if(!resultado.isEmpty())
	{
		console.log("resultado de errores: ",resultado);
		return res.render('auth/reset-password', {
			pagina: "Restablecer tu contraseña",
			errores: resultado.array(),
		});
	}

	const {token } = req.params;
	const { password } = req.body;

	const usuario = await Usuario.findOne({where:{token}});
	const salt = await bcrypt.genSalt(10);
	usuario.password = await bcrypt.hash(password, salt);
	usuario.token = null;
	await usuario.save();

	return res.render('auth/confirmarCuenta', {
		pagina: "Contraseña Restablecida",
		mensaje: "Nueva contraseña guardada correctamente"
	});
}

export {
	formularioLogin,
	autenticar,
	formularioRegistro,
	formularioOlvidePass,
	registrar,
	confirmarCorreo,
	resetPassword,
	comprobarToken, 
	nuevaContraseña
}