const admin = (req, res) => {
	res.render('propiedades/admin', {
		pagina: 'Mis propiedades',
		navegacion: true
	})
}

const crear = (req, res) => {
	res.render('propiedades/crear', {
		pagina: 'Crear producto',
		navegacion: true
	})
}

export { 
	admin,
	crear
}