import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema';
import { Attendance } from '../attendances/schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Event } from '../events/schema';
import { Organisation } from '../organisations/schema';
import { Friendship } from '../friendships/schema';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Friendship.name), useValue: jest.fn() }],
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1 day' },
        }),
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
