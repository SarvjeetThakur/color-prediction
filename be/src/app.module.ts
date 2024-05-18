import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './web-socket/socket.module';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameRecordsModule } from './game-records/game-records.module';
import { WalletModule } from './wallet/wallet.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI || "mongodb://localhost:27017/color-prediction"),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SocketModule,
    GameModule,
    GameRecordsModule,
    WalletModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
