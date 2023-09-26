import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { getModelToken } from '@nestjs/mongoose';
import { Recommendation } from './schema';

describe('RecommendationController', () => {
  let controller: RecommendationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [RecommendationsService, { provide: getModelToken(Recommendation.name), useValue: jest.fn() }],
    }).compile();

    controller = module.get<RecommendationsController>(RecommendationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
