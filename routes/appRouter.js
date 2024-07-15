import express from "express";
import { inicio,producto,noEncontrado, buscador} from "../controllers/appController.js";

const router = express.Router();

router.get('/inicio', inicio);
router.get('/producto/:id', producto);
router.get('/404', noEncontrado);
router.post('/buscador', buscador);

export default router;
