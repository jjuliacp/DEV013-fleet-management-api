import { Handler } from "express"
import { getDataExport, getLastLocations, getTaxiLocations } from "../services/trajectorieService"
import * as XLSX from "xlsx"
import * as fs from "fs"
import * as  nodemailer from "nodemailer"

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

export const lastLocation: Handler = async (req, res) => {
  // Endpoint para consultar la última ubicación reportada por cada taxi
  const page = parseInt(req.query.page as string) || 1; // Página por defecto 1
  const limit = parseInt(req.query.limit as string) || 10; // Límite por defecto 10
  const startIndex = (page - 1) * limit;
  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 10) {
    return res.status(400).json({ message: 'Los parámetros page y limit deben ser números enteros mayores' })
  }
  try {
    // Implementar la lógica para obtener la última ubicación de cada taxi
    const lastLocations = await getLastLocations(startIndex, limit)
    return res.status(200).json(lastLocations)
  } catch (error) {
    //console.error('Error al obtener la última ubicación de los taxis:', error);
    return res.status(500).json({ error: 'Error al obtener la última ubicación de los taxis' });
  }
}


// exportar trayectorias segun id y fecha /trajectories/id/export
export const exportToExcel: Handler = async (req, res) => {
  const { id } = req.params
  const { date, email } = req.query // obtener email 
  const searchdate = new Date(date as string) // Convertir la fecha a formato de objeto Date
  try {
    const data = await getDataExport(id, searchdate)
    // generar el archivo excel
    const worksheet = XLSX.utils.json_to_sheet(data as object[]); // genera una hoja de trabajo a partir de los datos
    const workbook = XLSX.utils.book_new(); // crea un nuevo libro 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trayectorias');//Añade la hoja de trabajo al libro de trabajo
    // Verifica si la carpeta temp existe
    if (!fs.existsSync('./temp')) {
      fs.mkdirSync('./temp'); // Crea la carpeta temp si no existe
    }
    const filePath = `./temp/trajectories_${id}_${date}.xlsx`; // define la ruta del archivo excel a crear

    // Crear el archivo temporalmente
    XLSX.writeFile(workbook, filePath);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",

      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL, // Remitente
      to: email as string, // Destinatario
      subject: 'Exportación de trayectorias intento 6',
      text: '¡Hola! Este es un correo electrónico de prueba 6', // Contenido del correo (texto plano)
      attachments: [ //adjuntar 
        {
          filename: `trajectories_${id}_${date}.xlsx`, // aqui le damos el nombre al archivo excel
          path: filePath, // aqui le pasamos el excel generado
        },
      ],
    };
    
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    //console.log('Correo electrónico enviado');
    
    // // Eliminar el archivo temporal
    // fs.unlinkSync(filePath);
    return res.status(200).json({ message: 'El archivo Excel ha sido enviado por correo electrónico' });
    
  } catch (error) {
    console.error('Error al obtener las ubicaciones del taxi', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }

}