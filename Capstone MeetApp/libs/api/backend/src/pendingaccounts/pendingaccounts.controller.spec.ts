import { Test, TestingModule } from '@nestjs/testing';
import { PendingAccountsController } from './pendingaccounts.controller';
import { PendingAccountsService } from './pendingaccounts.service';
import { getModelToken } from '@nestjs/mongoose';
import { PendingAccount } from './schema';

describe('PendingAccountsController', () => {
  let controller: PendingAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingAccountsController],
      providers: [PendingAccountsService, { provide: getModelToken(PendingAccount.name), useValue: jest.fn() }],
    }).compile();

    controller = module.get<PendingAccountsController>(PendingAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
