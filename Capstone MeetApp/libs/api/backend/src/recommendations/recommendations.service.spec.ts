import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsService } from './recommendations.service';
import { Recommendation } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Friendship } from '../friendships/schema';
import { Organisation } from '../organisations/schema';
import { Attendance } from '../attendances/schema';
import { User } from '../users/schema';
import { Event } from '../events/schema';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationsService, { provide: getModelToken(Recommendation.name), useValue: jest.fn() }, UsersService, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Friendship.name), useValue: jest.fn() }],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env['JWT_PRIVATE_KEY'],
          signOptions: { expiresIn: '1 day' },
        }),
      ],
    }).compile();

    service = module.get<RecommendationsService>(RecommendationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
