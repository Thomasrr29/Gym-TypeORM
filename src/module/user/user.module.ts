import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MembershipModule } from '../membership/membership.module';
import { forwardRef } from '@nestjs/common';
import { CoachModule } from '../coach/coach.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => MembershipModule), forwardRef(() => CoachModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}
