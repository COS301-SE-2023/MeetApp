import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';
import { OrganisationsModule } from '../organisations/organisations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendancesModule } from '../attendances/attendances.module';
import { FriendshipsModule } from '../friendships/friendships.module';
import { ApiKeyMiddleware } from './api-keyMiddleware';
import { PasswordRecoveriesModule } from '../passwordrecoveries/passwordrecoveries.module';
import { RecommendationModule } from '../recommendations/recommendations.module';
import { PendingAccountsModule } from '../pendingaccounts/pendingaccounts.module';

@Module({
  imports: [FriendshipsModule,RecommendationModule,PendingAccountsModule, AttendancesModule, PasswordRecoveriesModule, UsersModule, EventsModule, UsersModule, OrganisationsModule, MongooseModule.forRoot(process.env['DB_CONNECTION_STRING_SEDI'] || '', {dbName: process.env['DB_NAME_SEDI']})],
  controllers: [],
  providers: [ApiKeyMiddleware],
})
export class ApiBackendModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }}
