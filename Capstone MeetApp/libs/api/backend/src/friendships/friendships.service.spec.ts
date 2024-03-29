import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipsService } from './friendships.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema';
import { Friendship } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Attendance } from '../attendances/schema';
import { JwtModule } from '@nestjs/jwt';
import { Event } from '../events/schema';
import { Organisation } from '../organisations/schema';

describe('FriendshipsService', () => {
  let service: FriendshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendshipsService, UsersService, { provide: getModelToken(Friendship.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn()}],
      imports: [
        JwtModule.register({
          global: true,
          secret: 'exampleSecret',
          signOptions: { expiresIn: '1 day' },
        }),
      ]
    }).compile();

    service = module.get<FriendshipsService>(FriendshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
