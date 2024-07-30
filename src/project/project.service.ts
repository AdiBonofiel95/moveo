import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';

@Injectable()
export class ProjectService {
  constructor (private readonly databaseService: DatabaseService) {}

  async create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.databaseService.project.create({
      data: createProjectDto
    });
  }

  async findAll(name?: string, page: number = DefaultPage, limit: number = DefaultPageLimit) {
    if (name) {
      return this.databaseService.project.findUnique({
        where: {
          projectName: name
        }
      })
    }
    const skip = (page - 1) * limit;
    const items = await this.databaseService.project.findMany({
      skip,
      take: limit,
    })
    
    return {
      page: page,
      data: items
    };
  }

  async findOne(id: number) {
    return this.databaseService.project.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateProjectDto: Prisma.ProjectUpdateInput) {
    return this.databaseService.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.project.delete({
      where: {
        id,
      }
    });
  }
}
