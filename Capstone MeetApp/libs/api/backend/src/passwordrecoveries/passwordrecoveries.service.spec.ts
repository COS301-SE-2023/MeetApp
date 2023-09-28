import { Test, TestingModule } from '@nestjs/testing';
import { PasswordRecoveriesService } from './passwordrecoveries.service';
import { PasswordRecovery } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schema';
import { Organisation } from '../organisations/schema';
import { JwtModule } from '@nestjs/jwt';

describe('PasswordRecoveryService', () => {
  let service: PasswordRecoveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordRecoveriesService, { provide: getModelToken(PasswordRecovery.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env['JWT_PRIVATE_KEY'],
          signOptions: { expiresIn: '1 day' },
        })],
      }).compile();

    service = module.get<PasswordRecoveriesService>(PasswordRecoveriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
