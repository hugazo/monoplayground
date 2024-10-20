import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';


const prismaClient = new PrismaClient();

export type { Prisma };

export default prismaClient;
