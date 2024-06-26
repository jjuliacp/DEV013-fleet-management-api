import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
// })

//función que maneje las ubicaciones de los taxis segun id y date
export const getTaxiLocations = async (id: string, searchDate: Date, startIndex: number, limit: number) => {

  try {
    return await prisma.trajectories.findMany({
      skip: startIndex,
      take: limit,
      where: {
        taxi_id: parseInt(id),
        date: {
          gte: searchDate, // Fecha mayor o igual a la fecha especificada // todas las ubis que sean >= a la fecha
          lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) // Fecha menor a 24 horas después de la fecha especificada
        }
      },
      orderBy: {
        date: 'asc' // Ordenar por fecha ascendente
      }
    });

  }
  catch (error) {
    //console.error('Error al obtener las ubicaciones del taxi', error);
    return error
  }
}

export const getLastLocations = async (startIndex: number, limit: number) => {
  try {
    const result = await prisma.$queryRaw`
    SELECT DISTINCT ON (taxi_id) 
      latitude, 
      longitude, 
      taxi_id, 
      date 
    FROM trajectories 
    ORDER BY taxi_id, date DESC 
    OFFSET ${startIndex} 
    LIMIT ${limit};
  `;
    return result;
  } catch (error) {
    console.error('Error al obtener la última ubicación de los taxis:', error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
}

export const getDataExport = async (id: string, searchDate: Date) => {
  try {
    return await prisma.trajectories.findMany({
      where: {
        taxi_id: parseInt(id),
        date: {
          gte: searchDate, // Fecha mayor o igual a la fecha especificada // todas las ubis que sean >= a la fecha
          lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) // Fecha menor a 24 horas después de la fecha especificada
        }
      },
      orderBy: {
        date: 'asc' // Ordenar por fecha ascendente
      },
      select: {
        latitude: true,
        longitude: true,
        taxi_id: true,
        date: true,
      }
    });



  } catch (error) {
    return error
  }
}