import Producto from "./productos.js";
import Compra from "./compras.js";
import Usuario from "./usuarios.js";
import { ForeignKeyConstraintError } from "sequelize";

// Compra.hasOne(Usuario);
Compra.belongsTo(Usuario, {foreignKey: 'id_usuario'});

export {
	Compra,
	Producto,
	Usuario
}