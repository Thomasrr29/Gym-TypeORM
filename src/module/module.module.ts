import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MembershipModule } from './membership/membership.module';
import { GroupsModule } from './groups/groups.module';
import { CoachModule } from './coach/coach.module';

@Module({
  imports: [UserModule, MembershipModule, GroupsModule, CoachModule],
})
export class ModuleModule {}
