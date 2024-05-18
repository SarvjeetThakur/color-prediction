
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GameRecordsDocument = HydratedDocument<GameRecords>;


@Schema({ timestamps: true })
export class GameRecords {
    @Prop({ required: true })
    period: string;

    @Prop({ required: true, type: String })
    userId: string;

    @Prop({ required: true, type: String })
    color: string;

    @Prop({ required: false, type: Number })
    number: number;

    @Prop({ required: true, type: Number })
    contractMoney: number;

    @Prop({ required: true, type: String, default: 'Pending' })
    result: string
}


export const GameRecordsSchema = SchemaFactory.createForClass(GameRecords);