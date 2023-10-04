import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Attendance } from '../attendances/schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Organisation } from '../organisations/schema';
import { Event } from '../events/schema';
import { Friendship } from '../friendships/schema';
import { ObjectId } from 'mongodb';
import { userStubs} from '../stubs'
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
 
describe('UsersService', () => {
  let service: UsersService;
  //let jwtService: JwtService
  //let userModel: Model<User>;
   class MockUserModel {
    static findOne = jest.fn();
    static exec = jest.fn();
    static find = jest.fn();
    static select = jest.fn();
    static findById = jest.fn();
    save = jest.fn().mockResolvedValue(userStubs[0]);
     constructor(){
        return this;
     }
  }
  class MockEventModel {
    static findOne = jest.fn()
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

  const mockJwtService = {
    signAsync: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {provide: JwtService, useValue: mockJwtService} , { provide: getModelToken('User'), useValue: MockUserModel }, { provide: getModelToken(Attendance.name), useValue: MockAttendanceModel }, { provide: getModelToken(Event.name), useValue: MockEventModel }, { provide: getModelToken(Organisation.name), useValue: MockOrganisationModel }, { provide: getModelToken(Friendship.name), useValue:  MockFriendshipModel}],
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env['JWT_PRIVATE_KEY'],
          signOptions: { expiresIn: '1 day' },
        }),
      ],
    }).compile();

    jest.clearAllMocks();
    
    service = module.get<UsersService>(UsersService);
    //jwtService = module.get<JwtService>(JwtService);
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

  it('should return 409 error: username already exists', async () => {
    const testUser = userStubs[0]
    MockUserModel.findOne.mockReturnThis()
    MockUserModel.exec.mockReturnValue(
      testUser
    ).mockReturnThis;
    const createResult = await service.create(testUser)
    expect(createResult).toEqual({error : 409, message : 'The username already exists'});
  });

  it('should create user and return JWT payload ', async () => {
    const testUser = userStubs[0]
    MockUserModel.findOne.mockReturnThis()
    MockUserModel.exec.mockReturnValue(
      null
    ).mockReturnThis;
    mockJwtService.signAsync.mockResolvedValue('mockedAccessToken');
    
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    service.getUserSalt = jest.fn().mockReturnValue(5)
    const createResult = await service.create(testUser)
    expect(createResult).toEqual({
      access_token: 'mockedAccessToken',
      message: 'Signup successful',
    });
    expect(MockUserModel.findOne).toHaveBeenCalledWith({
      username: testUser.username,
    });
    expect(mockJwtService.signAsync).toHaveBeenCalledWith(
      {id : testUser.id, username : testUser.username, password: testUser.password}
    );
});

it('should return a user not found message', async () => {
  const unregisteredUser = {
    id: new ObjectId(),
    username: 'emily_smith',
    password: 'emmma24',
    profilePicture: 'emily24_profile.jpg',
    region: 'Joburg',
    emailAddress: 'emily.smith@example.com',
    interests: ['Movies', 'Camping', 'Basketball'],
  }
  const testUser = userStubs[0]
  MockUserModel.find.mockReturnValue(unregisteredUser).mockReturnThis()
  MockUserModel.exec.mockImplementation( (user) => {
    if (!userStubs.includes(unregisteredUser))
      return []
    else
      return [user]
  }
  ).mockReturnThis;
  const loginResult = await service.login(testUser.username, testUser.password)
  expect(loginResult).toEqual({user: null, message: 'User not found'});
});

it('should login the user and return jwt payload', async () => {
  const testUser = userStubs[0]
  MockUserModel.find.mockReturnValue(testUser).mockReturnThis()
  MockUserModel.exec.mockImplementation( () => {
    if (!userStubs.includes(testUser))
      return []
    else
      return [testUser]
  }
  ).mockReturnThis;
  mockJwtService.signAsync.mockResolvedValue('mockedAccessToken');
  
  (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
  (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  service.getUserSalt = jest.fn().mockReturnValue(5)
  const loginResult = await service.login(testUser.username, testUser.password)
  expect(loginResult).toEqual({
    access_token: 'mockedAccessToken',
    message: 'Login successful',
  });
  expect(MockUserModel.find).toHaveBeenCalledWith({
    username: testUser.username,
  });
  expect(mockJwtService.signAsync).toHaveBeenCalledWith(
    {id : testUser.id, username : testUser.username, password: testUser.password}
  );
});

it('should return an error message: Incorrect Password', async () => {
  const testUser = userStubs[0]
  MockUserModel.find.mockReturnValue(testUser).mockReturnThis()
  MockUserModel.exec.mockImplementation( () => {
    if (!userStubs.includes(testUser))
      return []
    else
      return [testUser]
  }
  ).mockReturnThis;
  mockJwtService.signAsync.mockResolvedValue('mockedAccessToken');
  
  (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
  (bcrypt.compare as jest.Mock).mockResolvedValue(false);
  service.getUserSalt = jest.fn().mockReturnValue(5)
  const loginResult = await service.login(testUser.username, testUser.password)
  expect(loginResult).toEqual({
    user: testUser.username,
    message: 'Incorrect password',
  });
  expect(MockUserModel.find).toHaveBeenCalledWith({
    username: testUser.username,
  });
  expect(mockJwtService.signAsync).not.toHaveBeenCalled(
  );
});

it('should return a list of users', async () => {
  MockUserModel.find.mockReturnValue(userStubs).mockReturnThis()
  MockUserModel.exec.mockReturnValue(userStubs).mockReturnThis;
  const findAllResult = await service.findAll()
  expect(findAllResult).toEqual(userStubs);
  expect(findAllResult).toHaveLength(userStubs.length)
  expect(MockUserModel.find).toHaveBeenCalledTimes(1
  );
    expect(MockUserModel.exec).toBeCalledTimes(1
  );
});

it('should return a specified user', async () => {
  const testUser = userStubs[0]
  const testUserID = testUser.id
  MockUserModel.findById.mockReturnThis();
  MockUserModel.exec.mockReturnValue( userStubs.find(user => user.id === testUserID) )
  
  const findUser = await service.findOne(testUserID.toString())
  expect(findUser).toEqual(testUser);
  expect(MockUserModel.findById).toHaveBeenCalledTimes(1
  );
    expect(MockUserModel.exec).toBeCalledTimes(1
  );
});

})
