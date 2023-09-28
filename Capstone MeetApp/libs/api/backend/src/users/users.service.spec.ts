import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Attendance } from '../attendances/schema';
import { JwtModule } from '@nestjs/jwt';
import { Organisation } from '../organisations/schema';
import { Event } from '../events/schema';
import { Friendship } from '../friendships/schema';
import { userStubs } from '../stubs'

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getModelToken(User.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Friendship.name), useValue: jest.fn() }],
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

  // describe('findAll', () => {
  //   it('should return all users', async () => {
  //     const testUsers = userStubs;
  //     await User.insertMany(testUsers);

  //     const users = await UsersService.findAll();
      
  //     // Assertions
  //     expect(users).toHaveLength(testUsers.length);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a user by ID', async () => {
  //     // Create a test user in the database or use a mock
  //     const testUser = userStubs[0];
  //     const savedUser = (await service.create(testUser));

  //     const user = service.findOne(testUser.ID.toString());

  //     // Assertions
  //     expect(user.then(res => res?.username)).toBe(testUser.username);
  //     expect(savedUser.message).toBe('The username already exists')
  //   });

  //   it('should return null for a non-existent ID', async () => {
  //     const nonExistentID = '1234567890';

  //     const user = await service.findOne(nonExistentID);

  //     // Assertions
  //     expect(user).toBeNull();
  //   });
  // });

//   describe('User API', () => {
//     it('should retrieve all users via GET', async () => {
//       const response = await request(app).get('/api/users');
  
//       // Assertions
//       expect(response.status).toBe(200);
//       expect(response.body.length).toBeGreaterThan(0); // Assuming you expect some users
//     });

// });

})
