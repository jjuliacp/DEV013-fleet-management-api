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
