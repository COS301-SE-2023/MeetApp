import { Test, TestingModule } from '@nestjs/testing';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { PasswordRecovery } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schema';

describe('PasswordRecoveryService', () => {
  let service: PasswordRecoveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordRecoveriesService, { provide: getModelToken(PasswordRecovery.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<PasswordRecoveriesService>(PasswordRecoveriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
