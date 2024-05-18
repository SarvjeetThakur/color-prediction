import { Module } from "@nestjs/common";
import { TasksService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Game, GameSchema } from "src/game/schema/game.schema";
import { GameRecords, GameRecordsSchema } from "src/game-records/schema/game-records.schema";


@Module({
    imports: [MongooseModule.forFeature([
        { name: Game.name, schema: GameSchema },
        { name: GameRecords.name, schema: GameRecordsSchema },
    ])],
    providers: [TasksService]
})

export class TaskModule { };