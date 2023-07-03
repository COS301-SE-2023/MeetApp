import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';
import { OrganisationsModule } from '../organisations/organisations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendancesModule } from '../attendances/attendances.module';
import { FriendshipsModule } from '../friendships/friendships.module';


@Module({
  imports: [FriendshipsModule, AttendancesModule, UsersModule, EventsModule, UsersModule, OrganisationsModule, MongooseModule.forRoot('mongodb+srv://Akani_H:K35873587@cluster0.lyg43am.mongodb.net/?retryWrites=true&w=majority', {dbName: 'MeetApp'})],
  controllers: [],
  providers: [],
})
export class ApiBackendModule {}
