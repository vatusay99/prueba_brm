import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { now } from "sequelize/lib/utils";

const Producto = db.define('productos',{

	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	nombre_producto: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	numero_lote_producto: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	precio_producto: {
		type: DataTypes.FLOAT.UNSIGNED,
		allowNull: false,
		default: 0
	},
	cantidad_producto: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		default: 0
	},
	fecha_ingreso: {
		type: DataTypes.DATE,
		allowNull: false,
		default: now()
	}
});

Producto.prototype.verificarNombre = function(nombre_producto){
	return this.nombre_producto;
}

export default Producto;