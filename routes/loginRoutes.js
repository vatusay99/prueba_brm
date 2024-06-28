import express from "express";
import { formularioLogin, formularioRegistro, formularioOlvidePass, registrar, confirmarCorreo } from "../controllers/loginController.js";

const router = express.Router();


router.route('/login')
	.get(formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmarCorreo);
router.get('/olvide-pass', formularioOlvidePass);

export default router;