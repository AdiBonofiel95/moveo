import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';

@Injectable()
export class TaskService {
  constructor (private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({
      data: createTaskDto
    });
  }

  async findAll(name?: string, page: number = DefaultPage, limit: number = DefaultPageLimit) {
    if (name) {
      return this.databaseService.task.findMany({
        where: {
          taskName: name,
        }
      });
    }

    const skip = (page - 1) * limit;
    const items = await this.databaseService.task.findMany({
      skip,
      take: limit,
    })

    return {
      page: page,
      data: items
    };
  }

  async findOne(id: number) {
    return this.databaseService.task.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      where: {
        id,
      },
      data: updateTaskDto
    });
  }

  async remove(id: number) {
    return this.databaseService.task.delete({
      where: {
        id,
      },
    });
  }
}
