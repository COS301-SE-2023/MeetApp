import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';
import { Organisation } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from '../events/events.service';
import { Event } from '../events/schema';

describe('OrganisationsController', () => {
  let controller: OrganisationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationsController],
      providers: [OrganisationsService, EventsService, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }],
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
