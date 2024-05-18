import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) { }

  @SubscribeMessage('createPeriod')
  create(@MessageBody() createGameDto: CreateGameDto) {
    console.log('createPeriod ', createGameDto);
    return 'createPeriod'
  }

  @SubscribeMessage('findAllGame')
  findAll(@MessageBody() data: { skip: number, limit: number }) {
    const { skip, limit } = data;
    return this.gameService.findAll({ skipPage: skip, limitPage: limit });
  }

  @SubscribeMessage('updateGamePeriod')
  update(@MessageBody() updateGameDto: UpdateGameDto) {
    return this.gameService.update(updateGameDto);
  }

}
