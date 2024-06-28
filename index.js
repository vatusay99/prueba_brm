// const express = require('express');
import express from "express";
import csrf from "csrf";
import pkg from "cookie-parser";
import loginRoutes from "./routes/loginRoutes.js";
import db from "./config/db.js";
const { cookieParser } = pkg;

const app = express();
app.use(express.urlencoded({extended: true}));

// app.use( cookieParser());
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

app.use('/auth', loginRoutes);


const port = 3000;

app.listen(port, ()=>{
	console.log("Servidor iniciado en http://localhost:3000");
})
