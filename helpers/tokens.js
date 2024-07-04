import jwt from "jsonwebtoken";


const GenerarJWT = id => jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '2h'})

const generarId = ()=> Date.now().toString(32) + Math.random().toString(32).substring(2);

export 
{
	GenerarJWT,
	generarId
}