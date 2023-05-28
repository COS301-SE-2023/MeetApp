import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [EventsModule, UsersModule, OrganisationsModule, MongooseModule.forRoot('mongodb+srv://u19007443:AGGGyM0C7n4VyBtN@cluster0.nh0ftux.mongodb.net/?retryWrites=true&w=majority', {dbName: 'MeetAppMockDB'})],
  controllers: [],
  providers: [],
})
export class ApiBackendModule {}
