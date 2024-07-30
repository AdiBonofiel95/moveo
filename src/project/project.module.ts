import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from 'src/database/database.module';

/**
 * Project Module
 * 
 * The ProjectModule integrates the project service and project controller, as well as the database module.
 */
@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
