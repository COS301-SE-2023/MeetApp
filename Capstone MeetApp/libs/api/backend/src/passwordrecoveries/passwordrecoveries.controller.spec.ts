import { Test, TestingModule } from '@nestjs/testing';
import { PasswordRecoveriesController } from './passwordrecoveries.controller';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { getModelToken } from '@nestjs/mongoose';
import { PasswordRecovery } from './schema';
import { User } from '../users/schema';
import { Organisation } from '../organisations/schema';

describe('PasswordRecoveryController', () => {
  let controller: PasswordRecoveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordRecoveriesController],
      providers: [PasswordRecoveriesService, { provide: getModelToken(PasswordRecovery.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }],
    }).compile();

    controller = module.get<PasswordRecoveriesController>(PasswordRecoveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
