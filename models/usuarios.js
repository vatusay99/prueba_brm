import { DataTypes } from "sequelize";
import db from "../config/db.js";
// import { Hooks } from "sequelize/lib/hooks";
import bcrypt, { genSalt } from 'bcrypt';

const Usuario = db.define('usuarios',{

	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	rol: {
		type: DataTypes.STRING,
		defaultValue: 'cliente'
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false
	},
	correo: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	token: DataTypes.STRING,
	activo: DataTypes.BOOLEAN
});

export default Usuario;