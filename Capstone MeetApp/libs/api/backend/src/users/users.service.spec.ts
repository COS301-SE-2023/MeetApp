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
    //userModel = module.get<Model<User>>(getModelToken('User'));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct user ', async () => {
    MockUserModel.findOne.mockReturnThis()
    MockUserModel.exec.mockReturnValue({
      _id: new ObjectId('64c8a86944224fc7644bd858'),
      username: 'sedimoko',
      password: '',
      region : 'Pretoria',
      profilePicture: '',
      emailAddress: 'lesedimokonyama@gmail.com',
      interests : ['Music', 'Networking', 'Sports', 'Fashion', 'Technology']
    }).mockReturnThis;
    const user = await service.getByUsername('sedimoko')
    expect(user?.region).toBe("Pretoria");
  });

  it('should return correct sum of ASCII values', async () => {
    const H = "Hello".charCodeAt(0)
    const E = "Hello".charCodeAt(1)
    const L = "Hello".charCodeAt(2)
    const L2 = "Hello".charCodeAt(3)
    const O = "Hello".charCodeAt(4)
    const charCodeHello = H + E + L + L2 + O
    const getAsciiValue = service.getAsciiSum('Hello')
    expect(getAsciiValue).toBe(charCodeHello);
  });

  it('should return correct salt value ', async () => {
    const H = "Hello".charCodeAt(0)
    const E = "Hello".charCodeAt(1)
    const L = "Hello".charCodeAt(2)
    const L2 = "Hello".charCodeAt(3)
    const O = "Hello".charCodeAt(4)
    const charCodeHello = H + E + L + L2 + O
    const getSaltValue = service.getUserSalt('Hello','Password')
    expect(getSaltValue).toBe((charCodeHello * 8) % 8);
  });

  it('should return correct salt value ', async () => {
    const H = "Hello".charCodeAt(0)
    const E = "Hello".charCodeAt(1)
    const L = "Hello".charCodeAt(2)
    const L2 = "Hello".charCodeAt(3)
    const O = "Hello".charCodeAt(4)
    const charCodeHello = H + E + L + L2 + O
    const getSaltValue = service.getUserSalt('Hello','Password')
    expect(getSaltValue).toBe((charCodeHello * 8) % 8);
  });

  // it('should return correct salt value ', async () => {
  //   const H = "Hello".charCodeAt(0)
  //   const E = "Hello".charCodeAt(1)
  //   const L = "Hello".charCodeAt(2)
  //   const L2 = "Hello".charCodeAt(3)
  //   const O = "Hello".charCodeAt(4)
  //   const charCodeHello = H + E + L + L2 + O
  //   const getSaltValue = service.getUserSalt('Hello','Password')
  //   expect(getSaltValue).toBe((charCodeHello * 8) % 8);
  // });

  // it('should return correct salt value ', async () => {
  //   const H = "Hello".charCodeAt(0)
  //   const E = "Hello".charCodeAt(1)
  //   const L = "Hello".charCodeAt(2)
  //   const L2 = "Hello".charCodeAt(3)
  //   const O = "Hello".charCodeAt(4)
  //   const charCodeHello = H + E + L + L2 + O
  //   const getSaltValue = service.getUserSalt('Hello','Password')
  //   expect(getSaltValue).toBe((charCodeHello * 8) % 8);
  // });

  // it('should return correct salt value ', async () => {
  //   const H = "Hello".charCodeAt(0)
  //   const E = "Hello".charCodeAt(1)
  //   const L = "Hello".charCodeAt(2)
  //   const L2 = "Hello".charCodeAt(3)
  //   const O = "Hello".charCodeAt(4)
  //   const charCodeHello = H + E + L + L2 + O
  //   const getSaltValue = service.getUserSalt('Hello','Password')
  //   expect(getSaltValue).toBe((charCodeHello * 8) % 8);
  // });

  it('should return correct salt value ', async () => {
    const H = "Hello".charCodeAt(0)
    const E = "Hello".charCodeAt(1)
    const L = "Hello".charCodeAt(2)
    const L2 = "Hello".charCodeAt(3)
    const O = "Hello".charCodeAt(4)
    const charCodeHello = H + E + L + L2 + O
    const getSaltValue = service.getUserSalt('Hello','Password')
    expect(getSaltValue).toBe((charCodeHello * 8) % 8);
  });

  // it('should get user attendances', async () => {
  //   const userId = 'userId123';
  //   const mockAttendanceList = [
  //     { eventID: new ObjectId() },
  //     { organisationID: new ObjectId()},
  //     { userID: new ObjectId() },
  //   ];
  //   const mockEventList = [
  //     { _id: new ObjectId(), name: 'Event 1' },
  //     { _id: new ObjectId(), name: 'Event 2' },
  //   ];

  //   // Mock the behavior of the attendance model
  //   MockAttendanceModel.find.mockReturnThis();
  //   MockAttendanceModel.select.mockReturnThis();
  //   MockAttendanceModel.exec.mockResolvedValue(mockAttendanceList);

  //   // Mock the behavior of the event model
  //   MockEventModel.find.mockReturnThis();
  //   MockEventModel.exec.mockResolvedValue(mockEventList);

  //   const result = await service.getUserAttendances(userId);

  //   expect(result).toEqual(mockEventList);
  // });


});


