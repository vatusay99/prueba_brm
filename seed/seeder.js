import { exit } from "node:process";
import productos from "./productos.js";
import usuario from "./usuariosSeed.js";
import compra from "./compraSeed.js";
import db from "../config/db.js";
import { log } from "node:console";
import { truncate } from "node:fs";
import { Compra, Producto, Usuario } from "../models/index.js";

const importarData = async ()=>{
	try {
		// Autenticar
		await db.authenticate();

		// generar las columnas
		await db.sync()

		// insertamos los datos
		await Producto.bulkCreate(productos);
		await Usuario.bulkCreate(usuario);
		await Compra.bulkCreate(compra);
		console.log("Datos de usuario y productos importados correctamente");
		exit();

	} catch (error) {
		console.log("error seeder: ",error);
		exit(1);
	}
}

const eliminarDatos = async () => {
	try {
		// Autenticar
		await db.authenticate();

		// generar las columnas
		await db.sync()

		// insertamos los datos
		await Producto.destroy({where: {}, truncate: true});
		await	Usuario.destroy({where: {}, truncate: true});
		await	Compra.destroy({where: {}, truncate: true});
		
		console.log("Datos de usuario y productos eliminados correctamente");
		exit();

	} catch (error) {
		console.log("error eliminar  seeder: ",error);
		exit(1);
	}
}

if(process.argv[2] === '-i')
{
	importarData();
}

if(process.argv[2] === '-e')
{
	eliminarDatos();
}