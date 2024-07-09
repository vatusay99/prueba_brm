import express from "express";
import { body } from "express-validator";
import { admin, view, crearProducto } from "../controllers/productosController.js";
import validarRutaAdmin from "../middleware/protegerAdmin.js";

const router = express.Router();

router.get('/mis-productos', validarRutaAdmin, admin);
router.get('/productos/crear', validarRutaAdmin, view);
router.post(
	'/productos/crear', 
	body('nombre_producto').trim().notEmpty().withMessage('El nombre del producto es obliglatorio.'),
	body('numero_lote_producto').trim().notEmpty().withMessage('El numero del producto es obliglatorio.'),
	body('precio_producto').isNumeric().withMessage('El precio del producto es obliglatorio.'),
	body('cantidad_producto').isNumeric().withMessage('La cantidad del producto es obliglatorio.')
	,crearProducto
);

export default router;