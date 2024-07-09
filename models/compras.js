import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Compra = db.define('compras',{
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	fecha_compra: {
		type: DataTypes.DATE,
		allowNull: true
	},
});

export default Compra;