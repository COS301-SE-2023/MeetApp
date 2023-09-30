import { PartialType } from '@nestjs/mapped-types';
import { CreateRecommendationDto } from './create-recommendation.dto';

export class UpdateRecommendationDto extends PartialType(CreateRecommendationDto) {}
