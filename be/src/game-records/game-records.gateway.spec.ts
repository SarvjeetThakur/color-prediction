import { Test, TestingModule } from '@nestjs/testing';
import { GameRecordsGateway } from './game-records.gateway';
import { GameRecordsService } from './game-records.service';

describe('GameRecordsGateway', () => {
  let gateway: GameRecordsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameRecordsGateway, GameRecordsService],
    }).compile();

    gateway = module.get<GameRecordsGateway>(GameRecordsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
