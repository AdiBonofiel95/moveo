import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

/**
 * Database Module
 * 
 * The DatabaseModule integrates the database service.
 */
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {

}
