import { Handler } from "express"
import { getTaxiLocations } from "../services/trajectorieService"

export const locationLog: Handler = async (req, res) => {
  //  aqui obtienes las ubicaciones 
  //El endpoint responde con el id del taxi y una fecha
  const { id } = req.params
  const { date } = req.query
  if (!id || !date) {
    return res.status(400).json({ message: 'los parametros taxiId y date son obligatorios en la consulta' })
  }
  const page = parseInt(req.query.page as string) || 1; // Página por defecto 1
  const limit = parseInt(req.query.limit as string) || 10; // Límite por defecto 10
  const searchdate = new Date(date as string) // Convertir la fecha a formato de objeto Date
  const startIndex = (page - 1) * limit;
  //obtener los taxis
  try {
    // Obtener las ubicaciones del taxi para la fecha especificada
    const taxiLocation = await getTaxiLocations(id, searchdate, startIndex, limit)
    // Paginar los resultados si es necesario

    // Esto depende de cuántas ubicaciones de taxi se esperen para una fecha determinada

    // Enviar respuesta con las ubicaciones del taxi
    return res.status(200).json(taxiLocation);

  } catch (error) {
   // console.error('Error al obtener las ubicaciones del taxi', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const lastLocation: Handler = async (_req, res) => {
  //  await prisma.$connect()


  res.send('aqui obtienes ultima ubicacion')
}