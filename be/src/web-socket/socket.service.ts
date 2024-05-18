import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import * as crypto from 'crypto'
import { Model } from "mongoose";
import { Server } from "socket.io";
import { getIncreaseAmount } from "src/common/common";
import { GameRecords, GameRecordsDocument } from "src/game-records/schema/game-records.schema";
import { CreateGameDto } from "src/game/dto/create-game.dto";
import { Game, GameDocument } from "src/game/schema/game.schema";
import { Wallet, WalletDocument } from "src/wallet/schema/wallet.schema";


@Injectable()
export class SocketService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>,
    @InjectModel(GameRecords.name) private readonly gameRecordsModel: Model<GameRecordsDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
  ) { }

  async create(createGameDto: CreateGameDto) {
    try {
      const { createNew } = createGameDto;
      const currentDate = new Date();
      const startOfToday = new Date(currentDate.setUTCHours(0, 0, 0, 0));
      const endOfToday = new Date(currentDate.setUTCHours(23, 59, 59, 999));

      const lastGame = await this.gameModel.find({ createdAt: { $gte: startOfToday, $lte: endOfToday } }).sort({ _id: -1 }).limit(1);
      function getCustomDateFormat() {
        const day = currentDate.getUTCDate().toString().padStart(2, '0');
        const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getUTCFullYear().toString();
        return `${day}${month}${year}`;
      };
      const periodNumber = lastGame.length ? getCustomDateFormat() + (Number(String(lastGame?.[0].period).slice(8)) + 1) : getCustomDateFormat() + 1;

      const generateRandomNumber = (min: number, max: number): number => {
        const range = max - min + 1;
        const randomBytes = crypto.randomBytes(4);
        const randomNumber = randomBytes.readUInt32LE(0) % range + min;
        return randomNumber;
      };
      const randomNumber = generateRandomNumber(0, 9);
      const results = {
        0: 'violet-red',
        5: 'violet-green',
        1: 'green',
        3: 'green',
        7: 'green',
        9: 'green',
        2: 'red',
        4: 'red',
        6: 'red',
        8: 'red',
      };

      if (createNew) {
        const data = {
          period: periodNumber,
          price: 0,
          number: randomNumber,
          result: results[randomNumber]
        };
        await this.gameModel.create(data);
        return {
          success: true,
          data: [],
          message: 'New period created'
        };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async update(io: Server, connectedUsers: any) {

    try {
      const today = new Date();
      const startOfToday = new Date(today.setUTCHours(0, 0, 0, 0));
      const endOfToday = new Date(today.setUTCHours(23, 59, 59, 999));

      const secondLastRecord = await this.gameModel.find({ createdAt: { $gte: startOfToday, $lte: endOfToday } }).sort({ _id: -1 });
      const userLastRecords = await this.gameRecordsModel.find({ period: secondLastRecord[0]?.period, createdAt: { $gte: startOfToday, $lte: endOfToday } })

      if (userLastRecords.length) {
        userLastRecords.forEach(async (ele) => {
          let win: string = '';
          let walletAmount: number = 0;
          const userWalletAmount = await this.walletModel.findOne({ userId: ele?.userId });
          if (ele?.number) {
            if (secondLastRecord?.[0].number === ele?.number) {
              walletAmount += getIncreaseAmount(userWalletAmount.amount, ele?.contractMoney, ele?.color, secondLastRecord?.[0].number === ele?.number, secondLastRecord?.[0].number);
              win = 'Win';
            } else {
              win = 'Lose';
              walletAmount = userWalletAmount.amount;
            };
          } else {
            if (secondLastRecord?.[0]?.result?.includes(ele?.color)) {
              walletAmount += getIncreaseAmount(userWalletAmount.amount, ele?.contractMoney, ele?.color, false, secondLastRecord?.[0].number);
              win = 'Win';
            } else {
              win = 'Lose';
              walletAmount = userWalletAmount.amount;
            };
          };

          await this.walletModel.updateOne({ _id: userWalletAmount._id }, { $set: { amount: walletAmount } });
          io.to(connectedUsers[ele.userId]).emit('updateWalletAmount', { amount: walletAmount });
          await this.gameRecordsModel.updateOne({ _id: ele._id, userId: ele.userId, period: secondLastRecord[0]?.period }, { $set: { result: win } });
        })
      }
      return `This action updates a gameRecords`;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}