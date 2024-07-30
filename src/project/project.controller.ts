import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
import { craftMessage } from 'utilities/functions';
import { DefaultPage, DefaultPageLimit } from 'utilities/globals';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  private readonly logger = new LoggerService(ProjectController.name)

  @Post()
  create(@Body() createProjectDto: Prisma.ProjectCreateInput) {
    this.logger.log(craftMessage("create", "a new project."), ProjectController.name);
    return this.projectService.create(createProjectDto);
  }
  
  @Get()
  findAll(@Query('name') name?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(craftMessage("read", `project by id: ${id}.`), ProjectController.name);
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Prisma.ProjectUpdateInput) {
    this.logger.log(craftMessage("update", `project by id: ${id}.`), ProjectController.name);
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(craftMessage("delete", `project by id: ${id}.`), ProjectController.name);
    return this.projectService.remove(+id);
  }
}
