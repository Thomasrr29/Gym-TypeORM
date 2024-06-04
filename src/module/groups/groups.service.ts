import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository, In } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Coach } from '../coach/entities/coach.entity';
import { Membership } from '../membership/entities/membership.entity';

@Injectable()
export class GroupsService {
  constructor
  (@InjectRepository(Group) 
  private readonly groupRepository: Repository<Group>,
  @InjectRepository(Coach) 
  private readonly coachRepository: Repository<Coach>,
  @InjectRepository(User) 
  private readonly userRepository: Repository<User>,
  @InjectRepository(Membership) 
  private readonly membershipRepository: Repository<Membership>
  ){}

  async create(createGroupDto: CreateGroupDto) {
    
    const {name, schedule, membershipId, coachId, userIds} = createGroupDto

    let validation = await this.groupRepository.findOne({where: {name: name}})

    if(validation){
      throw new Error(`The group with the name: ${name} already exists please try with other`)
    }

    let membership = await this.membershipRepository.findOne({where: {id: membershipId}})

    if(!membership){
      throw new Error(`The membership with the id: ${membershipId} no exists please try with other`)
    }

    let coach = await this.coachRepository.findOne({where: {id: coachId}})

    if(!coach){
      throw new Error(`The coach with the id: ${coachId} no exists please try with other`)
    }

    let users = await this.userRepository.find({where: {id: In(userIds)}})

    if(users.length !== userIds.length){
      throw new Error(`The user with the id: ${users} no exists please try with other`)
    }

    const group = this.groupRepository.create({
      name,
      schedule,
      users,
      coach,
      membership,
    })

    return await this.groupRepository.save(group)
  }

  async findAll
  (
    pagination: {page: number, limit: number},
    order: {orderField: string, direction: 'ASC'|'DESC'}
  )
  {
    
    const {page, limit} = pagination
    const {orderField, direction} = order
    
    const groups = this.groupRepository.createQueryBuilder('group')
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy(orderField, direction)
    .leftJoinAndSelect('groups.membership', 'membership')
    .leftJoinAndSelect('groups.coach', 'coach')
    .leftJoinAndSelect('groups.user', 'user')

    const [results, total] = await groups.getManyAndCount()

    return {
      data: results,
      total,
      page,
      order: orderField
    }

  }

  async findOne(id: number)
  {
    return `This action returns a #${id} group`;
  }

  async update( search: {searchField: string, searchValue: string}, updateGroupDto: UpdateGroupDto) {

    const {searchField, searchValue} = search

    return await this.groupRepository.createQueryBuilder('group')
    .update('group')
    .set(updateGroupDto)
    .where(`group.${searchField} Ilike :value`, {value: `%${searchValue}%`})
    .execute()
    
  }

  async remove(id: number) {
    return await this.groupRepository.softDelete(+id);
  }
}
