import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupsController } from './groups.controller';
import { MembershipModule } from '../membership/membership.module';
import { forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CoachModule } from '../coach/coach.module';


@Module({
  imports: [TypeOrmModule.forFeature([Group]), forwardRef(() => MembershipModule), forwardRef(() => UserModule), forwardRef(() => CoachModule) ],
  providers: [GroupsService],
  exports: [TypeOrmModule, GroupsService],
  controllers: [GroupsController]
})
export class GroupsModule {}
