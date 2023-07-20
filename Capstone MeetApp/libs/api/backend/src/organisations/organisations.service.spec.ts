import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsService } from './organisations.service';
import { EventsService } from '../events/events.service';
import { Organisation } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from '../events/schema';
import { Attendance } from '../attendances/schema';
import { User } from '../users/schema';

describe('OrganisationsService', () => {
  let service: OrganisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     providers: [OrganisationsService, EventsService, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }, { provide: getModelToken(Attendance.name), useValue: jest.fn() }, { provide: getModelToken(User.name), useValue: jest.fn() }],
    }).compile();

   service = module.get<OrganisationsService>(OrganisationsService);
  });

  it('should be defined', () => {
   expect(service).toBeDefined();
  });
});
