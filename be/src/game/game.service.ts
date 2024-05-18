import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game, GameDocument } from './schema/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) { }

  async findAll({ skipPage = 0, limitPage = 10 }) {
    try {
      const page = Number(skipPage) || 1;
      const limit = Number(limitPage) || 10;
      // adding 1 for skip last one
      const skip = ((page - 1) * limit) + 1;

      const today = new Date();
      const startOfToday = new Date(today.setUTCHours(0, 0, 0, 0));
      const endOfToday = new Date(today.setUTCHours(23, 59, 59, 999));

      const todayRecordsCount = await this.gameModel.countDocuments({
        createdAt: { $gte: startOfToday, $lte: endOfToday }
      }).skip(1);
      const gameResults = await this.gameModel.find({
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      }).sort({ _id: -1 }).skip(skip).limit(limit);

      return { count: todayRecordsCount, data: gameResults };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateGameDto: UpdateGameDto) {
    try {
      const { period, contractMoney } = updateGameDto;
      const record = await this.gameModel.findOne({ period });
      if (!record) {
        return new HttpException('There is no record found', HttpStatus.BAD_REQUEST);
      }
      let newPrice = 0
      newPrice = record?.price + contractMoney;
      await this.gameModel.updateOne({ period }, { $set: { price: newPrice } })
      return `This action updates a #${'id'} game`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
