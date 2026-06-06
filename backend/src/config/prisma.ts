// src/config/prisma.ts
import { PrismaClient } from "@prisma/client/extension";

// Instanciamos o Prisma apenas uma vez para toda a aplicação
const prisma = new PrismaClient();

export default prisma;