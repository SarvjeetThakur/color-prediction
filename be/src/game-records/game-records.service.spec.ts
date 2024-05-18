import { Test, TestingModule } from '@nestjs/testing';
import { GameRecordsService } from './game-records.service';

describe('GameRecordsService', () => {
  let service: GameRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameRecordsService],
    }).compile();

    service = module.get<GameRecordsService>(GameRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
