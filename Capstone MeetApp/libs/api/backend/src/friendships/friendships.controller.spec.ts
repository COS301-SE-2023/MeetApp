import { Test, TestingModule } from '@nestjs/testing';
import { FriendshipsController } from './friendships.controller';
import { FriendshipsService } from './friendships.service';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Friendship } from './schema';
import { User } from '../users/schema';
import { Attendance } from '../attendances/schema';

describe('FriendshipsController', () => {
  let controller: FriendshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendshipsController],
      providers: [FriendshipsService, UsersService, { provide: getModelToken(Friendship.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }],
    }).compile();

    controller = module.get<FriendshipsController>(FriendshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
