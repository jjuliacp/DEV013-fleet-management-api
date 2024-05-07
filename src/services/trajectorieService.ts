import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//función que maneje las ubicaciones de los taxis segun id y date
export const getTaxiLocations = async (taxiId: string, searchDate: Date) {

    try {
        const taxiLocations = await prisma.trajectories.findMany({
            // where: {
            //   taxi_id: parseInt(taxiId),
            //   timestamp: {
            //     gte: searchDate, // Fecha mayor o igual a la fecha especificada
            //     lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) // Fecha menor a 24 horas después de la fecha especificada
            //   }
            // },
            // orderBy: {
            //   timestamp: 'asc' // Ordenar por fecha ascendente
            // }
        });

        return taxiLocations
    }
    catch (error) {
        console.error('Error al obtener las ubicaciones del taxi', error);
    }
}
