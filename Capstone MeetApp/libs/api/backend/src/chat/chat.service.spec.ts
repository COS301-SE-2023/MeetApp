import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { Chat } from './schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, { provide: getModelToken(Chat.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
