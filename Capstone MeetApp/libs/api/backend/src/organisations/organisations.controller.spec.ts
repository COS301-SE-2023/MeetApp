import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';
import { Organisation } from './schema';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from '../events/events.service';
import { Event } from '../events/schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

describe('OrganisationsController', () => {
  let controller: OrganisationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationsController],
      providers: [OrganisationsService, EventsService, { provide: getModelToken(Organisation.name), useValue: jest.fn() }, { provide: getModelToken(Event.name), useValue: jest.fn() }],
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1 day' },
        }),
      ]
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
