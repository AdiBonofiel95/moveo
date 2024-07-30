import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Task } from '@prisma/client';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PageObj } from 'utilities/types';

@Injectable()
export class TaskService {
  constructor (private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput): Promise<Task> {
    return this.databaseService.task.create({
      data: createTaskDto
    });
  }

  async findAll(
    name?: string, 
    page: number = DefaultPage, 
    limit: number = DefaultPageLimit
  ):Promise<PageObj> {
    const skip = (page - 1) * limit;
    const items = name ? await this.databaseService.task.findMany({
      skip,
      take: limit,
      where : { taskName: name }
    }) : 
    await this.databaseService.task.findMany({
      skip,
      take: limit,
    });

    return {page: page, data: items};
  }

  async findOne(id: number):Promise<Task> {
    return this.databaseService.task.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput):Promise<Task> {
    return this.databaseService.task.update({
      where: {
        id,
      },
      data: updateTaskDto
    });
  }

  async remove(id: number):Promise<Task> {
    return this.databaseService.task.delete({
      where: {
        id,
      },
    });
  }
}
