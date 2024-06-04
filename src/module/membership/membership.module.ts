import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { UserModule } from '../user/user.module';
import { forwardRef } from '@nestjs/common';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Membership]), forwardRef(() => UserModule), forwardRef(() => GroupsModule)],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService, TypeOrmModule]
})
export class MembershipModule {}
