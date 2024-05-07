import { PrismaClient } from '@prisma/client';
// interacción con la base de dato
const prisma = new PrismaClient();

export const getTaxis = async (startIndex: number, limit: number) => {
  return await prisma.taxis.findMany({
    skip: startIndex,
    take: limit,
  });
};