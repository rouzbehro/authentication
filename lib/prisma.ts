import { PrismaClient } from '@prisma/client';

// Add type declarations for the global object
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single PrismaClient instance
const prismaInstance = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaInstance; // Reuse the instance in development to avoid multiple connections
}

export const prisma = prismaInstance;
