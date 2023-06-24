import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationsController } from './organisations.controller';
import { EventsService } from '../events/events.service';
import { EventSchema } from '../events/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../events/events.module';
import { Organisation, OrganisationSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),EventsModule,MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [OrganisationsController],
  providers: [OrganisationsService, EventsService],
})
export class OrganisationsModule {}
