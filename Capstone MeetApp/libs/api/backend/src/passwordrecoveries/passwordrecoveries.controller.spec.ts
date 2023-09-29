import { Test, TestingModule } from '@nestjs/testing';
import { PasswordRecoveriesController } from './passwordrecoveries.controller';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { getModelToken } from '@nestjs/mongoose';
import { PasswordRecovery } from './schema';
import { User } from '../users/schema';
import { Organisation } from '../organisations/schema';
import { JwtModule } from '@nestjs/jwt';

describe('PasswordRecoveryController', () => {
  let controller: PasswordRecoveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordRecoveriesController],
      providers: [PasswordRecoveriesService, { provide: getModelToken(PasswordRecovery.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env['JWT_PRIVATE_KEY'],
          signOptions: { expiresIn: '1 day' },
        })],
    }).compile();

    controller = module.get<PasswordRecoveriesController>(PasswordRecoveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
