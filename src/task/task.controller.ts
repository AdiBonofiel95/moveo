import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Prisma, Task } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { craftMessage } from 'utilities/functions';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PaginationObj } from 'utilities/types';

/**
 * Taks Controller class. 
 * 
 * This class is in charge of handling and processing incoming requests, 
 * and returning the appropriate response to the client, that are related to the tasks. It is also
 * responsible for all the routing regard the tasks. 
 */
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  private readonly logger = new LoggerService(TaskController.name)

  /**
   * This function is in charge of the post requests coming from the client in order to create a new
   * task record.
   * @param createTaskDto - body of the requests that holds all the relevant parameters, provided by the client.
   * @returns a Task object with the created task.
   */
  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput): Promise<Task> {
    this.logger.log(craftMessage("create", "a new task."), TaskController.name);
    return this.taskService.create(createTaskDto);
  }

  /**
   * This function is in charge of the get requests coming from the client in order to retrive
   * tasks records. this function accepts several optional query parameters, that allowes the user to get
   * different records accordingly.
   * @param name - optional, task name for filtering tasks with a specific name.
   * @param page - optional - the requested page sent by the client.
   * @param limit - optional - the requested page size sent by the client.
   * @returns - PaginationObj- holds tasks records splitted to pages for specific page and pagination information.
   */
  @Get()
  findAll(
    @Query('name') name?: string, 
    @Query('page') page?: string, 
    @Query('limit') limit?: string
  ): Promise<PaginationObj<Task>> {
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

  /**
   * This function is in charge of the get requests coming from the client in order to retrive
   * a single task record. the lookup for the task is according to a provided id number.
   * @param id - id of the desired task provided by the client.
   * @returns - a task record related to the provided id.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    this.logger.log(craftMessage("read", `a task by id:${id}.`), TaskController.name);
    return this.taskService.findOne(+id);
  }

  /**
   * This function is in charge of the update requests coming from the client in order to update
   * an existing task record. the lookup for the task is according to a provided id number.
   * @param id - id of the task that the client wishes to update.
   * @param updateTaskDto - body of the requests that holds the relevant fields the client wishes to update, provided by the client.
   * @returns - a task record related to the provided id of the updated task.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: Prisma.TaskUpdateInput): Promise<Task> {
    this.logger.log(craftMessage("update", `a task by id:${id}.`), TaskController.name);
    return this.taskService.update(+id, updateTaskDto);
  }

  /**
   * This function is in charge of the delete requests coming from the client in order to delete
   * an existing task record. the lookup for the task is according to a provided id number.
   * @param id - id of the task that the client wishes to delete.
   * @returns - a task record related to the provided id of the deleted task. 
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    this.logger.log(craftMessage("delete", `a task by id:${id}.`), TaskController.name);
    return this.taskService.remove(+id);
  }
}
