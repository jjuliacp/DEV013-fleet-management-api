import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//función que maneje las ubicaciones de los taxis segun id y date
export const getTaxiLocations = async (id: string, searchDate: Date, startIndex: number, limit: number) => {

    try {
      return  await prisma.trajectories.findMany({
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

export const getLastLocations = async (skip: number, take: number) =>{
  try{
    return await prisma.trajectories.findMany({
      // ordena todos los registros de trayectorias en base a la fecha, del más reciente al más antiguo.
      orderBy: {
        date: 'desc',
      },
      select:{
        latitude:true,
        longitude: true,
        taxi_id: true,
        date: true,
      },
      distinct: ["taxi_id"], //solo se devuelva un resultado único para cada taxi_id, eliminando duplicados
      skip,
      take,
    })
  }catch (error){
    return error
  }
}