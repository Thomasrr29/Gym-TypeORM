import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';
import { Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { User } from '../user/entities/user.entity';
import { Group } from '../groups/entities/group.entity';

@Injectable()
export class MembershipService {

  constructor
  (
    @InjectRepository(Membership) 
    private membershipRepository: Repository<Membership>,
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(Group) 
    private groupRepository: Repository<Group>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ){}

  async create(createMembershipDto: CreateMembershipDto) {

    const {name, startDate, endDate, userId, groupId} = createMembershipDto

    let validation = await this.membershipRepository.findOne({where: {name: name}})

    if(validation){
      throw new Error(`The group with the name: ${name} already exists, please try with other name`)
    }

    let users = await this.userRepository.find({where: {id: userId}})

    if(!users){
      throw new Error(`The user with the ID: ${userId} no exists, please try with other ID`)
    }

    let groups = await this.groupRepository.find({where: {id: groupId}})

    if(!groups){
      throw new Error(`The group with the ID: ${groupId} no exists, please try with other ID`)  
    }

    const membership = this.membershipRepository.create({
      name, 
      startDate,
      endDate,
      users,
      groups
    })

    return await this.membershipRepository.save(membership)

  }

  async findAll(
    pagination: {page: number, limit: number},
    order: {orderField: string, direction: 'ASC' | 'DESC'}
    
  ) {
    const {page, limit} = pagination
    const {orderField, direction} = order

    const [results, total] = await this.membershipRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {[orderField]: direction},
      relations: {
        users: true,
        groups: true
      }
    })

    return {
      data: results,
      total,
      page
    }
  }

  async findOne(id: number) {
    return await this.membershipRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    return await this.membershipRepository.update(id, updateMembershipDto)
  }

  async remove(id: number) {
    return await this.membershipRepository.softDelete(+id)
  }
}