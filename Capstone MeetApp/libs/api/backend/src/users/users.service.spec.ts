import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Attendance } from '../attendances/schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Organisation } from '../organisations/schema';
import { Event } from '../events/schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }],
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1 day' },
        }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
