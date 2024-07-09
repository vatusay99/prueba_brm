import { validationResult } from 'express-validator';
import { Producto, Compra, Usuario } from "../models/index.js";


const admin = (req, res) => {
	res.render('productos/admin', {
		pagina: 'Mis propiedades',
		navegacion: true
	})
}

const view = (req, res) => {
	res.render('productos/crear', {
		pagina: 'Crear producto',
		navegacion: true,
		datos: {}
	})
}

const crearProducto = async(req, res) => {
	let resultado = validationResult(req);
	if(!resultado.isEmpty())
	{
		return res.render('productos/crear', {
			pagina: 'Crear producto',
			navegacion: true,
			errores: resultado.array(),
			datos: req.body
		})
	}
	console.log('req.body', req.body);
	return res.send('ok');
	
	const { nombre_producto,  numero_lote_producto, precio_producto, cantidad_producto, fecha_ingreso} = req.body;
	try {
		// almacenar usuario nuevo
		const productoCreado = await Producto.create({
			nombre_producto,
			numero_lote_producto,
			precio_producto,
			cantidad_producto,
			fecha_ingreso
		});
		
	} catch (error) {
		console.log('error_DB', error);
	}

	
	

	console.log('productoCreado', productoCreado);

	// res.render('productos/crear', {
	// 	pagina: 'Crear producto',
	// 	navegacion: true,
	// 	msg: {productoCreado}
	// })
}

export { 
	admin,
	view,
	crearProducto
}