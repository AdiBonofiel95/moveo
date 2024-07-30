import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { LoggerModule } from './logger/logger.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';

@Module({
  imports: [
    DatabaseModule, 
    ProjectModule, 
    TaskModule, 
    LoggerModule, 
    UserAuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
