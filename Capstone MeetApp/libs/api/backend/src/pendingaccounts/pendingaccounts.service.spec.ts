import { Test, TestingModule } from '@nestjs/testing';
import { PendingAccountsService } from './pendingaccounts.service';
import { PendingAccount } from './schema';
import { getModelToken } from '@nestjs/mongoose';

describe('PendingAccountsService', () => {
  let service: PendingAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingAccountsService, { provide: getModelToken(PendingAccount.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<PendingAccountsService>(PendingAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
