import { Controller, Post, Query, Patch, Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {

    constructor(private readonly groupServices: GroupsService){}


    @Get('/get/all')
    async findAll
    (
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('orderField') orderField: string,
        @Query('direction') direction: 'ASC'|'DESC',
    )
    {
        const search = {page, limit}
        const order = {orderField, direction}

        return this.groupServices.findAll(search, order)
    }
        
    @Post('/create')
    create(@Body() createCoachDto: CreateGroupDto) 
    {
        return this.groupServices.create(createCoachDto);
    }


    @Patch('/update')
    update
    (
        @Query('searchField') searchField: string,
        @Query('searchValue') searchValue: string,
        @Body() updateGroupDto: UpdateGroupDto
    ){

        const search = {searchField, searchValue}
        return this.groupServices.update(search, updateGroupDto)
    }
}
