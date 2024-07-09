import nodemailer from "nodemailer";

const emailRegistro = async (datos)=>{
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	// console.log(datos); 
	const { nombre, correo, token } = datos;
	await transport.sendMail({
		from:"brm_registro@gmail.com",
		to: correo,
		subject: "Activa tu registro de BRM",
		text: "Activacion de cuenta BRM",
		html: `
			<p>Hola ${nombre} para activar tu registro debes confirmarla en el siguiente enlace:
			<a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma tu cuenta</a> </p>

			<p>Si no te activaste en BRM puedes omitir este correo.</p>
		`
	})

}

const emailOlvideContraseña = async (datos)=>{
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	const { nombre, correo, token } = datos;
	await transport.sendMail({
		from:"brm_registro@gmail.com",
		to: correo,
		subject: "Restablece la contraseña de BRM",
		text: "Restablece la contraseña cuenta BRM",
		html: `
			<p>Hola ${nombre} para cambiar tu contraseña debes hacer click en el siguiente enlace:
			<a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-pass/${token}">Restablecer Contraseña</a> </p>

			<p>Si no solicitaste el cambio de contraseña para RMB puedes omitir este correo.</p>
		`
	})

}

export {
	emailRegistro,
	emailOlvideContraseña
}