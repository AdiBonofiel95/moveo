import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PaginationDto, PaginationObj } from 'utilities/types';

/**
 * Project Serveice Class
 * 
 * This class is is in charge of implementing the CRUD functions used at the
 * project controller, that manages the system projects. 
 */
@Injectable()
export class ProjectService {
  constructor (private readonly databaseService: DatabaseService) {}

    /**
   * An implemintation of the create function, that creates a new project record in the
   * database. 
   * @param createTaskDto - Prisma create data type.
   * @returns - a Project object with the created project.
   */
  async create(createProjectDto: Prisma.ProjectCreateInput): Promise<Project> {
    return this.databaseService.project.create({
      data: createProjectDto
    });
  }

  /**
   * Retrives all projects records in the database splitted to pages (pagination). Page size and page number 
   * can be provided by the client to determine the page size and page number accordingly. 
   * If client provides name, returns only a single project with the matching name. 
   * @param name - optional, project name for retriving a single project by name.
   * @param page - optional - the requested page sent by the client.
   * @param limit - optional - the requested page size sent by the client.
   * @returns - PaginationObj- holds projects records splitted to pages for specific page and pagination information.
   */
  async findAll(
    name?: string, 
    page: number = DefaultPage, 
    limit: number = DefaultPageLimit
  ): Promise <PaginationObj<Project> | Project> {
    if (name) {
      return this.databaseService.project.findUnique({
        where: {
          projectName: name
        }
      })
    }
    const skip = (page - 1) * limit;
    const [items, totalCount] = await this.databaseService.$transaction([
      this.databaseService.project.findMany({
        skip,
        take: limit,
      }),
      this.databaseService.project.count()
    ]);

    const paginationDto: PaginationDto = {
      totalCount: totalCount,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
    };
    
    return {
      pagination: paginationDto,
      data: items
    };
  }

  /**
   * Retrives a single project record by project id lookup.
   * @param id - id of the desired project provided by the client.
   * @returns - a project record related to the provided id. if no such project exists - empty obj is returned.
   */
  async findOne(id: number): Promise<Project> {
    return this.databaseService.project.findUnique({
      where: {
        id,
      }
    });
  }

  /**
   * An implemintation of the update function, that updates an existing project record in the
   * database.
   * @param id - id of the project that the client wishes to update.
   * @param updateProjectDto - Prisma update data type.
   * @returns - a project record related to the provided id of the updated project.
   */
  async update(id: number, updateProjectDto: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.databaseService.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
  }

  /**
   * An implemintation of the delete function, that deletes an existing project record in the
   * database.
   * @param id - id of the project that the client wishes to delete.
   * @returns - a project record related to the provided id of the deleted project.
   */
  async remove(id: number): Promise<Project> {
    return this.databaseService.project.delete({
      where: {
        id,
      }
    });
  }
}
