import { Test, TestingModule } from '@nestjs/testing';
import { PendingAccountsService } from './pendingaccounts.service';
import { PendingAccount } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Organisation } from '../organisations/schema';
import { Friendship } from '../friendships/schema';
import { User } from '../users/schema';
import { Attendance } from '../attendances/schema';
import { Event } from '../events/schema';

describe('PendingAccountsService', () => {
  let service: PendingAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingAccountsService, { provide: getModelToken(PendingAccount.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Friendship.name), useValue:  jest.fn()}],
    }).compile();

    service = module.get<PendingAccountsService>(PendingAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
