import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { JwtModule } from '@nestjs/jwt';
import { Event, EventSchema } from '../events/schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';
import { Friendship, FriendshipSchema } from '../friendships/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Attendance.name, schema: AttendanceSchema }, { name: Event.name, schema: EventSchema }, { name: Organisation.name, schema: OrganisationSchema }, { name: Friendship.name, schema: FriendshipSchema}]), JwtModule.register({
    global: true,
    secret: process.env['JWT_PRIVATE_KEY'],
    signOptions: { expiresIn: '1 day' },
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
