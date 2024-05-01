//import { PrismaClient } from "@prisma/client";
import { Handler } from "express"  // interfaz handler para describir funciones manejadoras de app express
//const prisma = new PrismaClient ()

//console.log('prisma inicializado');


//getAllTaxis
export const getAllTaxis:Handler = async (_req, res) => {
  //  await prisma.$connect()


res.send('aqui obtienes todos los taxis')
}

//getTaxisbyIdOrPlate
//npx prisma db pull
 