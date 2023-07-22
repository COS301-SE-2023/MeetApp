import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { Event, EventSchema } from '../events/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Attendance.name, schema: AttendanceSchema }, { name: Event.name, schema: EventSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
