import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationsController } from './organisations.controller';
import { EventsService } from '../events/events.service';
import { EventSchema } from '../events/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../events/events.module';
import { Organisation, OrganisationSchema } from './schema';
import { JwtModule } from '@nestjs/jwt';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { User, UserSchema } from '../users/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),EventsModule,MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }, {name : Attendance.name, schema: AttendanceSchema}, {name : User.name, schema: UserSchema}]), JwtModule.register({
    global: true,
    secret: process.env['JWT_PRIVATE_KEY'],
    signOptions: { expiresIn: '1 day' },
  })],
  controllers: [OrganisationsController],
  providers: [OrganisationsService, EventsService],
})
export class OrganisationsModule {}
