import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { Friendship, FriendshipSchema } from '../friendships/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Attendance.name, schema: AttendanceSchema }, { name: Friendship.name, schema: FriendshipSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
