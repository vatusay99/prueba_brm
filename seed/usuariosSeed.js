import { bcrypt } from "bcrypt";

const usuario = [
	{
		rol:'Administrador',
		nombre: 'DavidAdmin',
		correo: "admin@gmail.com",
		password: bcrypt.hashSync('password',10),
		token: null,
		activo: 1
	},
	{
		rol:'Administrador',
		nombre: 'DavidAdmin2',
		correo: "admin2@gmail.com",
		password: bcrypt.hashSync('admin123',10),
		token: null,
		activo: 1
	},
];

export default usuario;