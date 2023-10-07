import { Test, TestingModule } from '@nestjs/testing';
import { PendingAccountsController } from './pendingaccounts.controller';
import { PendingAccountsService } from './pendingaccounts.service';
import { getModelToken } from '@nestjs/mongoose';
import { PendingAccount } from './schema';
import { Friendship } from '../friendships/schema';
import { Organisation } from '../organisations/schema';
import { User } from '../users/schema';
import { Attendance } from '../attendances/schema';
import { Event } from '../events/schema';

describe('PendingAccountsController', () => {
  let controller: PendingAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingAccountsController],
      providers: [PendingAccountsService, { provide: getModelToken(PendingAccount.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Friendship.name), useValue:  jest.fn()}],
    }).compile();

    controller = module.get<PendingAccountsController>(PendingAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
