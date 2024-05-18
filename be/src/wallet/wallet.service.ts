import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>) { }

  async create(createWalletDto: CreateWalletDto) {
    try {
      const payload={
        haveWallet:true,
        ...createWalletDto
      };
      await this.walletModel.create(payload);
      return { message: 'Wallet created' ,success:true};
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserWallet(userId: string) {
    try {
      const response = await this.walletModel.findOne({ userId });
      return { data: response };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateWalletDto: UpdateWalletDto) {
    try {
      const { userId, amount, actionType } = updateWalletDto;

      let updatedBalance: number;
      const currentBalance = await this.walletModel.findOne({ userId });

      if (actionType === 'add') {
        updatedBalance = currentBalance.amount + amount;
      } else if (actionType === 'deduct') {
        if (currentBalance.amount < 10) {
          return new BadRequestException(`You don't have money `);
        }
        updatedBalance = currentBalance.amount - amount;
      } else {
        return new BadRequestException('Invalid action type. Please provide either "add" or "deduct".');
      }

      await this.walletModel.updateOne({ userId }, { amount: updatedBalance });
      return {
        message: 'Wallet amount updated',
        updatedBalance,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }


  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
