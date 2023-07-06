import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationsController } from './organisations.controller';
import { EventsService } from '../events/events.service';
import { EventSchema } from '../events/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../events/events.module';
import { Organisation, OrganisationSchema } from './schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),EventsModule,MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }, {name : Attendance.name, schema: AttendanceSchema}])],
  controllers: [OrganisationsController],
  providers: [OrganisationsService, EventsService],
})
export class OrganisationsModule {}
