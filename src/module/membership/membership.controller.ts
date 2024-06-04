import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('/create')
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipService.create(createMembershipDto);
  }

  @Get('/find/all')
  findAll
  (
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC'|'DESC'
  ){

    const pagination = {page, limit}
    const order = {orderField, direction}

    return this.membershipService.findAll(pagination, order);
  }

  @Get('/find/by')
  findOne(@Param('id') id: string) {
    return this.membershipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto) {
    return this.membershipService.update(+id, updateMembershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipService.remove(+id);
  }
}
