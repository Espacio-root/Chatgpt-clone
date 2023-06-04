import { PrismaClient } from '@prisma/client'
import { Message } from './validators/message'

export const prisma = new PrismaClient()