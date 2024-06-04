import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/find/all')
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC'|'DESC',
  ) {

    const pagination = {page, limit}
    const order = {orderField, direction}

    return this.userService.findAll(pagination, order);
  }

  @Get('/find/by')
  findOne(
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string,
  ) 
  {
    return this.userService.findOne({searchField, searchValue});
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
