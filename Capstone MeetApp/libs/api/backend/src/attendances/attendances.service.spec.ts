import { Test, TestingModule } from '@nestjs/testing';
import { AttendancesService } from './attendances.service';
import { Attendance } from './schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AttendancesService', () => {
  let service: AttendancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendancesService, { provide: getModelToken(Attendance.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<AttendancesService>(AttendancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
