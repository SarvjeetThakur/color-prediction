import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GameRecordsService } from './game-records.service';
import { CreateGameRecordDto } from './dto/create-game-record.dto';

@WebSocketGateway()
export class GameRecordsGateway {
  constructor(private readonly gameRecordsService: GameRecordsService) { }

  @SubscribeMessage('createGameRecord')
  create(@MessageBody() createGameRecordDto: CreateGameRecordDto) {
    return this.gameRecordsService.create(createGameRecordDto);
  }

  @SubscribeMessage('findAllGameRecords')
  findAll() {
    return this.gameRecordsService.findAll();
  }

  @SubscribeMessage('findUserAllGameRecords')
  findUserAllGameRecords(@MessageBody() payload:any) {
    return this.gameRecordsService.findUserAllGameRecords(payload);
  }

  @SubscribeMessage('findOneGameRecord')
  findOne(@MessageBody() id: number) {
    return this.gameRecordsService.findOne(id);
  }

  // @SubscribeMessage('updateGameRecord')
  // update() {
  //   return this.gameRecordsService.update();
  // }

  @SubscribeMessage('removeGameRecord')
  remove(@MessageBody() id: number) {
    return this.gameRecordsService.remove(id);
  }
}
