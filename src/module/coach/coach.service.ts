import { Injectable, Query, Search } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CoachService {

  constructor(@InjectRepository(Coach) private coachRepository: Repository<Coach>){}

  async create(createCoachDto: CreateCoachDto){

      const {email} = createCoachDto
      const validation = await this.coachRepository.findOneBy({email})

      if(validation){
        throw new Error('Email already exists please login or try with other email')
      }
      return this.coachRepository.save(createCoachDto)
  }

  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {

    let  coaches = this.coachRepository.createQueryBuilder('coach')
    .skip((page - 1) * limit)
    .take(limit)

    const [results, total] = await coaches.getManyAndCount()

    return {
      data: results,
      total,
      pages: page,
      limit,
    }
  }

  async findOne(

    search : {searchField: string, searchValue: string},
    order : {orderField: string, direction: 'ASC' | 'DESC'},
    pagination : {page: number, limit: number}
    
  ) {

    const {searchValue, searchField} = search
    const {orderField, direction} = order
    const {page, limit} = pagination

    return this.coachRepository.createQueryBuilder('coach')
    .where(`coach.${searchField} Ilike :value`, {value: `%${searchValue}%`})
    .orderBy(`coach.${orderField}`, direction)
    .skip((page - 1) * limit)
    .take(limit)
  
  }

  async update( search: {searchField: string, searchValue: string}, updateCoachDto: UpdateCoachDto) {

    const {searchField, searchValue } = search

    return await this.coachRepository.createQueryBuilder('coach')
    .update('coach')
    .set(updateCoachDto)
    .where(`coach.${searchField} Ilike :value`, {value: `%${searchValue}%`})
    .execute()
  }

  async remove(id: number) {
    return await this.coachRepository.softDelete(id)
  }
}
