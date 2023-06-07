import { Test, TestingModule } from '@nestjs/testing';
import { AttendancesService } from './attendances.service';

describe('AttendancesService', () => {
  let service: AttendancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendancesService],
    }).compile();

    service = module.get<AttendancesService>(AttendancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
