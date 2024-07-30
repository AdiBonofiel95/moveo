import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Prisma, Task } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { craftMessage } from 'utilities/functions';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PageObj } from 'utilities/types';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  private readonly logger = new LoggerService(TaskController.name)

  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput): Promise<Task> {
    this.logger.log(craftMessage("create", "a new task."), TaskController.name);
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('name') name?: string, 
    @Query('page') page?: string, 
    @Query('limit') limit?: string
  ): Promise<PageObj> {
    name !== undefined ? this.logger.log(craftMessage("read", `task by name: ${name}`), TaskController.name) :
    this.logger.log(
      craftMessage("read", `all task records, page:${page ?? DefaultPage}, limit:${limit ?? DefaultPageLimit}.`), 
      TaskController.name);
    return this.taskService.findAll(
      name, 
      page ? +page : undefined, 
      limit ? +limit : undefined
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    this.logger.log(craftMessage("read", `a task by id:${id}.`), TaskController.name);
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: Prisma.TaskUpdateInput): Promise<Task> {
    this.logger.log(craftMessage("update", `a task by id:${id}.`), TaskController.name);
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    this.logger.log(craftMessage("delete", `a task by id:${id}.`), TaskController.name);
    return this.taskService.remove(+id);
  }
}
