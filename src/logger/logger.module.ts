import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

/**
 * Logger Module
 * 
 * The LoggerModule integrates the loger service.
 */
@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {}
