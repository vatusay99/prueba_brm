// const express = require('express');
import express from "express";
import csrf from "csrf";
import loginRoutes from "./routes/loginRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import appRoutes from "./routes/appRouter.js";
import db from "./config/db.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded({extended: true}));

app.use( cookieParser());
// app.use( csrf());

// conexion a DB
try {
	await db.authenticate();
	db.sync();
	console.log("Conectado correctamente a base de datos.");
} catch (error) {
	console.log(error);
}

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))

app.use('/', appRoutes);
app.use('/auth', loginRoutes);
app.use('/', productosRoutes);

const port = 3000;

app.listen(port, ()=>{
	console.log("Servidor iniciado en http://localhost:3000");
})
