import { validationResult } from 'express-validator';


const inicio = (req, res) => {

	res.render('inicio',{
		pagina: "Pagina de inicio",
	});

}

const producto = (req, res) => {
	
}

const noEncontrado = async(req, res) => {
	
}

const buscador = async(req, res) => {
	
}

export { 
	inicio,
	producto,
	noEncontrado,
	buscador
}