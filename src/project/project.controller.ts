import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma, Project } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { craftMessage } from 'utilities/functions';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';
import { PaginationObj } from 'utilities/types';

/**
 * Taks Controller class.
 * 
 * This class is in charge of handling and processing incoming requests, 
 * and returning the appropriate response to the client, that are related to the projects. It is also
 * responsible for all the routing regard the projects. 
 */
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  private readonly logger = new LoggerService(ProjectController.name)

  /**
   * This function is in charge of the post requests coming from the client in order to create a new
   * project record.
   * @param createProjectDto - body of the requests that holds all the relevant parameters, provided by the client.
  * @returns a Project object with the created project.
   */
  @Post()
  create(@Body() createProjectDto: Prisma.ProjectCreateInput): Promise<Project> {
    this.logger.log(craftMessage("create", "a new project."), ProjectController.name);
    return this.projectService.create(createProjectDto);
  }
  
  /**
   * This function is in charge of the get requests coming from the client in order to retrive
   * projects records. this function accepts several optional query parameters, that allowes the user to get
   * different records accordingly.
   * @param name - optional, project name for retriving a single project with a specific name.
   * @param page - optional - the requested page sent by the client.
   * @param limit - optional - the requested page size sent by the client.
   * @returns - PaginationObj- holds projects records splitted to pages for specific page and pagination information.
   */
  @Get()
  findAll(
    @Query('name') name?: string, 
    @Query('page') page?: string, 
    @Query('limit') limit?: string
  ): Promise<PaginationObj<Project> |Project> {
    name !== undefined ? this.logger.log(craftMessage("read", `project by name: ${name}`), ProjectController.name) : 
    this.logger.log(
      craftMessage("read", `all project records, page:${page ?? DefaultPage}, limit:${limit ?? DefaultPageLimit}.`), 
      ProjectController.name
    );
    return this.projectService.findAll(
      name, 
      page ? +page : undefined, 
      limit ? +limit : undefined
    );
  }

  /**
   * This function is in charge of the get requests coming from the client in order to retrive
   * a single project record. the lookup for the project is according to a provided id number.
   * @param id - id of the desired project provided by the client.
   * @returns - a project record related to the provided id.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    this.logger.log(craftMessage("read", `project by id: ${id}.`), ProjectController.name);
    return this.projectService.findOne(+id);
  }

  /**
   * This function is in charge of the update requests coming from the client in order to update
   * an existing project record. the lookup for the project is according to a provided id number.
   * @param id - id of the project that the client wishes to update.
   * @param updateProjectDto - body of the requests that holds the relevant fields the client wishes to update, provided by the client.
   * @returns - a project record related to the provided id of the updated project.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Prisma.ProjectUpdateInput): Promise<Project> {
    this.logger.log(craftMessage("update", `project by id: ${id}.`), ProjectController.name);
    return this.projectService.update(+id, updateProjectDto);
  }

  /**
   * This function is in charge of the delete requests coming from the client in order to delete
   * an existing project record. the lookup for the project is according to a provided id number.
   * @param id - id of the project that the client wishes to delete.
   * @returns - a project record related to the provided id of the deleted project. 
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Project> {
    this.logger.log(craftMessage("delete", `project by id: ${id}.`), ProjectController.name);
    return this.projectService.remove(+id);
  }
}
