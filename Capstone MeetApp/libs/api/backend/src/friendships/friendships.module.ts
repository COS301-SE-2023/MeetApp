import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from './schema';
import { User, UserSchema } from '../users/schema';
import { UsersService } from '../users/users.service';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { Event, EventSchema } from '../events/schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Friendship.name, schema: FriendshipSchema }]), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Attendance.name, schema: AttendanceSchema }, { name: Event.name, schema: EventSchema }, { name: Organisation.name, schema: OrganisationSchema}])],
  controllers: [FriendshipsController],
  providers: [FriendshipsService, UsersService]
})
export class FriendshipsModule {}
