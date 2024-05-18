import { Injectable } from '@nestjs/common';
import { CreateGameRecordDto } from './dto/create-game-record.dto';
import { GameRecords, GameRecordsDocument } from './schema/game-records.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GameRecordsService {
  constructor(
    @InjectModel(GameRecords.name) private readonly gameRecordsModel: Model<GameRecordsDocument>,
  ) { }

  async create(createGameRecordDto: CreateGameRecordDto) {
    await this.gameRecordsModel.create(createGameRecordDto);
    return 'This action adds a new gameRecord';
  }

  findAll() {
    return `This action returns all gameRecords`;
  }
  async findUserAllGameRecords(payload: any,) {
    const { userId, skipPage, limitPage } = payload;
    const page = Number(skipPage) || 1;
    const limit = Number(limitPage) || 10;
    const skip = (page - 1) * limit;


    const today = new Date();
    const startOfToday = new Date(today.setUTCHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setUTCHours(23, 59, 59, 999));
    const total = await this.gameRecordsModel.countDocuments({userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });
    const result = await this.gameRecordsModel.find({
      userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    }).sort({ _id: -1 }).skip(skip).limit(limit);

    return { data: result, total };
  }
  findOne(id: number) {
    return `This action returns a #${id} gameRecord`;
  }


  remove(id: number) {
    return `This action removes a #${id} gameRecord`;
  }
}
