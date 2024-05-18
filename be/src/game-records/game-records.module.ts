import { Module } from '@nestjs/common';
import { GameRecordsService } from './game-records.service';
import { GameRecordsGateway } from './game-records.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { GameRecords, GameRecordsSchema } from './schema/game-records.schema';
import { Game, GameSchema } from 'src/game/schema/game.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: GameRecords.name, schema: GameRecordsSchema },
    { name: Game.name, schema: GameSchema }])],
  providers: [GameRecordsGateway, GameRecordsService],
})
export class GameRecordsModule { }
