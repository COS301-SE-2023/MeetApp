import { Module } from '@nestjs/common';
import { PendingAccountsService } from './pendingaccounts.service';
import { PendingAccountsController } from './pendingaccounts.controller';
import { PendingAccount, PendingAccountSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from '../friendships/schema';
import { User, UserSchema } from '../users/schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { Event, EventSchema } from '../events/schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PendingAccount.name, schema: PendingAccountSchema }, { name: User.name, schema: UserSchema },{ name: Attendance.name, schema: AttendanceSchema }, { name: Event.name, schema: EventSchema }, { name: Organisation.name, schema: OrganisationSchema }, { name: Friendship.name, schema: FriendshipSchema}])],
  controllers: [PendingAccountsController],
  providers: [PendingAccountsService]
})
export class PendingAccountsModule {}
