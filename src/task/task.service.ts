import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Task } from '@prisma/client';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PaginationDto, PaginationObj } from 'utilities/types';

/**
 * Task Serveice Class
 * 
 * This class is is in charge of implementing the CRUD functions used at the
 * task controller, that manages the tasks related to projects
 */
@Injectable()
export class TaskService {
  constructor (private readonly databaseService: DatabaseService) {}

  /**
   * An implemintation of the create function, that creates a new task record in the
   * database. 
   * @param createTaskDto - Prisma create data type.
   * @returns - a Task object with the created task.
   */
  async create(createTaskDto: Prisma.TaskCreateInput): Promise<Task> {
    return this.databaseService.task.create({
      data: createTaskDto
    });
  }

  /**
   * Retrives all task records in the database splitted to pages (pagination). Page size and page number 
   * can be provided by the client to determine the page size and page number accordingly. 
   * If client provides name, the tasks are filtered according to the related task name. 
   * @param name - optional, task name for filtering tasks with a specific name.
   * @param page - optional - the requested page sent by the client.
   * @param limit - optional - the requested page size sent by the client.
   * @returns - PaginationObj- holds tasks records splitted to pages for specific page and pagination information.
   */
  async findAll(
    name?: string, 
    page: number = DefaultPage, 
    limit: number = DefaultPageLimit
  ): Promise<PaginationObj<Task>> {
    const skip = (page - 1) * limit;
    const [items, totalCount] = name ? await this.databaseService.$transaction([
      this.databaseService.task.findMany({
        skip,
        take: limit,
        where : { taskName: name }
      }),
      this.databaseService.task.count()]) : 
      await this.databaseService.$transaction([
        this.databaseService.task.findMany({
          skip,
          take: limit,
        }),
        this.databaseService.task.count()
    ]);

    const paginationDto: PaginationDto = {
      totalCount: totalCount,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
    };


    return {pagination: paginationDto, data: items};
  }

  /**
   * Retrives a single task record by task id lookup.
   * @param id - id of the desired task provided by the client.
   * @returns - a task record related to the provided id. if no such task exists - empty obj is returned.
   */
  async findOne(id: number):Promise<Task> {
    return this.databaseService.task.findUnique({
      where: {
        id,
      }
    });
  }

  /**
   * An implemintation of the update function, that updates an existing task record in the
   * database.
   * @param id - id of the task that the client wishes to update.
   * @param updateTaskDto - Prisma update data type.
   * @returns - a task record related to the provided id of the updated task.
   */
  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput):Promise<Task> {
    return this.databaseService.task.update({
      where: {
        id,
      },
      data: updateTaskDto
    });
  }

  /**
   * An implemintation of the delete function, that deletes an existing task record in the
   * database.
   * @param id - id of the task that the client wishes to delete.
   * @returns - a task record related to the provided id of the deleted task.
   */
  async remove(id: number):Promise<Task> {
    return this.databaseService.task.delete({
      where: {
        id,
      },
    });
  }
}
