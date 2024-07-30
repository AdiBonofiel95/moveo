import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Database Service class.
 * 
 * This class is very simple - it connects the service to the database, so we can use
 * Prisma functionality that interacts with the database. 
 */
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
    async onModuleInit(): Promise<void> {
        await this.$connect();
    }
}
