import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { Recommendation, RecommendationSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Recommendation.name, schema: RecommendationSchema }])],
  controllers: [RecommendationsController],
  providers: [RecommendationsService]
})
export class RecommendationModule {}
