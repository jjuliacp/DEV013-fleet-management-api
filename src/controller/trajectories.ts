import { Handler } from "express"

export const locationLog:Handler = async (req, res) => {
    //  aqui obtienes las ubicaciones
  //El endpoint responde con el id del taxi y una fecha
  const { taxiId } = req.params
  const { date } = req.query
  if(!taxiId || !date ){
    res.status(400).json({message: 'los parametros taxiId y date son obligatorios en la consulta'})
  }
  const searchdate = new Date(date as string) // Convertir la fecha a formato de objeto Date
  // muestra la info: latitud, longitud y timestamp (fecha y hora).
  // paginar  los resultados
  res.send('aqui obtienes las ubicaciones')
  }

  export const lastLocation:Handler = async (_req, res) => {
    //  await prisma.$connect()
  
  
  res.send('aqui obtienes ultima ubicacion')
  }