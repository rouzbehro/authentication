import { PrismaClient } from '@prisma/client';

// Add type declarations for the global object
declare global {
  var prisma: PrismaClient | undefined; // Use var here for compatibility with globalThis
}

// Create a single PrismaClient instance
const prismaInstance = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismaInstance; // Reuse the instance in development to avoid multiple connections
}

export const prisma = prismaInstance;
