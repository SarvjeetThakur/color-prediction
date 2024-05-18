import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { GameRecords, GameRecordsDocument } from 'src/game-records/schema/game-records.schema';
import { Game, GameDocument } from 'src/game/schema/game.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>,
    @InjectModel(GameRecords.name) private readonly gameRecordsModel: Model<GameRecordsDocument>,
  ) { }
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteOldRecords() {
    try {
      const currentDate = new Date(Date.now()).setHours(0, 0, 0, 0)
      await this.gameModel.deleteMany({ createdAt: { $lte: new Date(currentDate) } });
      await this.gameRecordsModel.deleteMany({ createdAt: { $lte: new Date(currentDate) } });
      this.logger.debug('Old data deleted successfully');
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}