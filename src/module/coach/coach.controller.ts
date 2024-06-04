import { Controller, Get, Post, Body, Patch, Param, Delete, Search } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Query } from '@nestjs/common';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post('coach')
  create(@Body() createCoachDto: CreateCoachDto) 
  {
    return this.coachService.create(createCoachDto);
  }

  @Get('/find/all')
  findAll
  (
    @Query('limit') limit : number = 10,
    @Query('page') page : number = 5,
  ) 
  {
    
    return this.coachService.findAll(limit, page);

  }

  @Get('/find/where')
  findOne
  (
    @Query('searchField') searchField : string,
    @Query('searchValue') searchValue : string,
    @Query('limit') limit : number = 10,
    @Query('page') page : number = 10,
    @Query('order') orderField : string,
    @Query('direction') direction : 'ASC' | 'DESC',
  ) 
  {

    return this.coachService.findOne({searchField, searchValue},{orderField, direction},{limit, page});
  }

  @Patch('/update/where')
  update
  (
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string, 
    @Body() updateCoachDto: UpdateCoachDto
  ) 
  {
    return this.coachService.update({searchField, searchValue}, updateCoachDto);
  }

  @Delete('/delete/:id')
  remove(@Query('id') id: number) {
    return this.coachService.remove(+id);
  }
}
