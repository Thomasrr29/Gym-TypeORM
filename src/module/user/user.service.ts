import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository} from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { forwardRef } from '@nestjs/common';
import { MembershipService } from '../membership/membership.service';
import { Membership } from '../membership/entities/membership.entity';
import { Coach } from '../coach/entities/coach.entity';

@Injectable()
export class UserService {

  constructor
  (
  @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
  @Inject(forwardRef(() => MembershipService))
  private readonly membershipService: MembershipService
){}

  async create(createUserDto: CreateUserDto) {
    
    const {name, email, cellphone, role, coachId, membershipId} = createUserDto

    let membership = await this.membershipRepository.findOne({where: {id: membershipId}})

    if(!membership){
      throw new Error(`The membership with the ID: ${membershipId} wasn't found`)
    }

    let coaches = await this.coachRepository.findOne({where: {id: coachId}})

    if(!coaches){
      throw new Error(`The coach with the ID: ${coachId} wasn't found`)
    }

    let emailValidation = await this.userRepository.findOneBy({email})

    if(emailValidation){
      throw new Error(`The account with the email: ${email} already exists, please try with other` )
    }

    const user = this.userRepository.create({
      name,
      email,
      cellphone,
      membership,
      coaches,
      role,
    })

    return await this.userRepository.save(user)
  }

  async findAll
  (
    pagination : {page: number, limit: number},
    order : {orderField: string, direction : 'ASC' | 'DESC'},
  ) 
  {
    const {page, limit} = pagination
    const {orderField, direction} = order

    const [results, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: (limit),
      order: {[orderField]: direction},
      relations: {
        coaches: true,
        groups: true,
        membership: true,
      }
    })

    return {
      data: results,
      total: total,
      page,
      limit, 
    }
  }

  async findOne(search: {searchValue: string, searchField: string })
  {

    const {searchField, searchValue} = search

    const [results, total] = await this.userRepository.createQueryBuilder('user')
    .where(`user.${searchField} ILIKE  :value`, {value: `%${searchValue}%`})
    .getManyAndCount()

    return {
      data: results, 
      total,
    }
    
  }

  async findOneById(id: number){
    return this.membershipService.findOne(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    return this.membershipService.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(+id);
  }
}
