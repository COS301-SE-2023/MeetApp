import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { Recommendation, RecommendationSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/schema';
import { Organisation, OrganisationSchema } from '../organisations/schema';
import { Attendance, AttendanceSchema } from '../attendances/schema';
import { Event, EventSchema } from '../events/schema';
import { Friendship, FriendshipSchema } from '../friendships/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Recommendation.name, schema: RecommendationSchema }, { name: User.name, schema: UserSchema }, { name: Organisation.name, schema: OrganisationSchema }, { name: Attendance.name, schema: AttendanceSchema }, { name: Event.name, schema: EventSchema }, { name: Friendship.name, schema: FriendshipSchema }])],
  controllers: [RecommendationsController],
  providers: [RecommendationsService, UsersService]
})
export class RecommendationModule {}
