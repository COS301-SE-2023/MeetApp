import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }, {name : Organisation.name, schema: OrganisationSchema}, {name : Attendance.name, schema: AttendanceSchema}])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
