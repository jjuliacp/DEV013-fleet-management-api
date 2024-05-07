import { Handler } from "express"  // interfaz handler para describir funciones manejadoras de app express
import { getTaxis } from "../services/taxiService";


//sin interactuar directamente con la base de datos.

//getAllTaxis
export const getAllTaxis: Handler = async (req, res) => {
  try {
    // Obtener los parámetros de consulta para paginación y límite
    const page = parseInt(req.query.page as string) || 1; // Página por defecto 1
    const limit = parseInt(req.query.limit as string) || 10; // Límite por defecto 10

    // Calcular el índice de inicio
    if (page < 1 || limit < 10) {
      res.status(400).json({ message: "Bad Request- solicitud invalida" });
    } else {
      const startIndex = (page - 1) * limit;
      //obtener los taxis
      const taxis = await getTaxis(startIndex, limit);

      if (taxis.length === 0) {
        res.status(404).json({ message: "No se encontraron usuarios" });
      } else {
        //enviar respuesta con los taxis
        res.status(200).json(taxis);
      }
    }
  } catch (error) {
    //manejar errores
    console.error('error al obtener los taxis', error)
    res.status(500).json({ error: 'error al obtener los taxis' })
  }
}

//agregar paginación y limit

