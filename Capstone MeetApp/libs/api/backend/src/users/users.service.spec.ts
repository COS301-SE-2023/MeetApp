import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Attendance } from '../attendances/schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
