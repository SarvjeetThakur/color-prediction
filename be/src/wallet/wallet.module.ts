import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletGateway } from './wallet.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, walletSchema } from './schema/wallet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: walletSchema }])],
  providers: [WalletGateway, WalletService],
})
export class WalletModule { }
