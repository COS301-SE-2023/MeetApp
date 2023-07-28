import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsService } from './organisations.service';
import { EventsService } from '../events/events.service';
import { Organisation } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from '../events/schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Attendance } from '../attendances/schema';
import { User } from '../users/schema';

describe('OrganisationsService', () => {
  let service: OrganisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     providers: [OrganisationsService, EventsService, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }],
     imports: [
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1 day' },
      }),
    ]
    }).compile();

   service = module.get<OrganisationsService>(OrganisationsService);
  });

  it('should be defined', () => {
   expect(service).toBeDefined();
  });
});
