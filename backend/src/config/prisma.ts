// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Lemos a URL do banco do seu ambiente (o ! garante ao TypeScript que a variável existe)
const connectionString = process.env.DATABASE_URL!;

// 2. Criamos o gerenciador de conexões nativo do PostgreSQL
const pool = new Pool({ connectionString });

// 3. Encapsulamos esse Pool dentro do adaptador oficial do Prisma
const adapter = new PrismaPg(pool);

// 4. Instanciamos o Prisma enviando a configuração do adaptador de forma obrigatória
const prisma = new PrismaClient({ adapter });

export default prisma;