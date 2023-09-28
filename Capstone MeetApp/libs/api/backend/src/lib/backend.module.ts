import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';
import { OrganisationsModule } from '../organisations/organisations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendancesModule } from '../attendances/attendances.module';
import { FriendshipsModule } from '../friendships/friendships.module';
import { ApiKeyMiddleware } from './api-keyMiddleware';
import { RecommendationModule } from '../recommendations/recommendations.module';


@Module({
  imports: [FriendshipsModule,RecommendationModule, AttendancesModule, UsersModule, EventsModule, UsersModule, OrganisationsModule, MongooseModule.forRoot('mongodb+srv://u19007443:AGGGyM0C7n4VyBtN@cluster0.nh0ftux.mongodb.net/?retryWrites=true&w=majority', {dbName: 'MeetAppMockDB'})],
  controllers: [],
  providers: [ApiKeyMiddleware],
})
export class ApiBackendModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }}
