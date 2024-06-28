import express from "express";
import { formularioLogin, formularioRegistro, formularioOlvidePass, registrar, confirmarCorreo, resetPassword, comprobarToken, nuevaContraseña } from "../controllers/loginController.js";

const router = express.Router();


router.route('/login')
	.get(formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmarCorreo);
router.get('/olvide-pass', formularioOlvidePass);
router.post('/olvide-pass', resetPassword);

//Cambio de contraseña
router.get('/olvide-pass/:token', comprobarToken);
router.post('/olvide-pass/:token', nuevaContraseña);

export default router;