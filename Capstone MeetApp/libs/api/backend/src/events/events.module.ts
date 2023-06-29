import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }, {name : Organisation.name, schema: OrganisationSchema}])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
