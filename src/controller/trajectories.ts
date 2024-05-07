import { Handler } from "express"

export const locationLog:Handler = async (_req, res) => {
    //  await prisma.$connect()
  
  
  res.send('aqui obtienes las ubicaciones')
  }

  export const lastLocation:Handler = async (_req, res) => {
    //  await prisma.$connect()
  
  
  res.send('aqui obtienes ultima ubicacion')
  }