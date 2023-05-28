import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [EventsModule, UsersModule, OrganisationsModule,],
  controllers: [],
  providers: [],
})
export class ApiBackendModule {}
