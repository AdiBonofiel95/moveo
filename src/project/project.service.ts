import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PageObj } from 'utilities/types';

@Injectable()
export class ProjectService {
  constructor (private readonly databaseService: DatabaseService) {}

  async create(createProjectDto: Prisma.ProjectCreateInput): Promise<Project> {
    return this.databaseService.project.create({
      data: createProjectDto
    });
  }

  async findAll(
    name?: string, 
    page: number = DefaultPage, 
    limit: number = DefaultPageLimit
  ): Promise <PageObj | Project> {
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

  async findOne(id: number): Promise<Project> {
    return this.databaseService.project.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateProjectDto: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.databaseService.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  async remove(id: number): Promise<Project> {
    return this.databaseService.project.delete({
      where: {
        id,
      }
    });
  }
}
