import jwt from "jsonwebtoken";
import Usuario from "../models/usuarios.js";


const validarRutaAdmin = async (req, res, next)=>{

	//Verificar si hay un token
	console.log("cookie: ", req.cookies._token);
	const {_token} = req.cookies
	if(!_token)
	{
		return res.redirect('/auth/login');
	}

	// validar si el token es correcto

	try {
		const decode = jwt.verify(_token, process.env.JWT_SECRET);
		const usuario = await Usuario.scope('eliminarPassword').findByPk(decode.id);
		// console.log('usuario: ',usuario);
		if(usuario)
		{
			req.usuario = usuario; 
			next();
		}
		else
		{
			return res.redirect('/auth/login');
		}

		
	} catch (error) {
		return res.clearCookie('_token').redirect('/auth/login');
	}
	
}

export default validarRutaAdmin;