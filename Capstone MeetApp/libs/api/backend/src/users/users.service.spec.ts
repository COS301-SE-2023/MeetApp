import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Attendance } from '../attendances/schema';
import { JwtModule } from '@nestjs/jwt';
import { Organisation } from '../organisations/schema';
import { Event } from '../events/schema';
import { Friendship } from '../friendships/schema';
import { ObjectId } from 'mongodb';

describe('UsersService', () => {
  let service: UsersService;
  //let userModel: Model<User>;
  class MockUserModel {
    static findOne = jest.fn();
    static exec = jest.fn();
    static find = jest.fn();
    static select = jest.fn();
  }
  class MockEventModel {
    static findOne = jest.fn();
    static find = jest.fn();
    static exec = jest.fn();
    static select = jest.fn();
  }
  class MockAttendanceModel {
    static findOne = jest.fn();
    static exec = jest.fn();
    static select = jest.fn();
    static find = jest.fn();
  }
  class MockFriendshipModel {
    static findOne = jest.fn();
    static exec = jest.fn();
    static find = jest.fn();
    static select = jest.fn();
  }
  class MockOrganisationModel {
    static findOne = jest.fn();
    static exec = jest.fn();
    static find = jest.fn();
    static select = jest.fn();
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken('User'), useValue: MockUserModel }, { provide: getModelToken(Attendance.name), useValue: MockAttendanceModel }, { provide: getModelToken(Event.name), useValue: MockEventModel }, { provide: getModelToken(Organisation.name), useValue: MockOrganisationModel }, { provide: getModelToken(Friendship.name), useValue:  MockFriendshipModel}],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env['JWT_PRIVATE_KEY'],
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
