import { Module } from "@nestjs/common";
import { GameGateway } from "./gatway.event";
import { MongooseModule } from "@nestjs/mongoose";
import { Game, GameSchema } from "src/game/schema/game.schema";
import { SocketService } from "./socket.service";
import { GameRecords, GameRecordsSchema } from "src/game-records/schema/game-records.schema";
import { Wallet, walletSchema } from "src/wallet/schema/wallet.schema";


@Module({
  imports: [MongooseModule.forFeature([
    { name: Game.name, schema: GameSchema },
    { name: GameRecords.name, schema: GameRecordsSchema },
    { name: Wallet.name, schema: walletSchema },
  ])],
  providers: [GameGateway, SocketService]
})
export class SocketModule { }