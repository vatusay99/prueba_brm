import express from "express";
import { admin, crear } from "../controllers/propiedadesController.js";

const router = express.Router();

router.get('/mis-productos', admin);
router.get('/productos/crear', crear);

export default router;