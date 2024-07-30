import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/database/database.module';

/**
 * Task Module
 * 
 * The TaskModule integrates the Task service and Task controller, as well as the database module.
 */
@Module({
  imports:[DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
