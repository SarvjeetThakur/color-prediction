import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema({ timestamps: true })

export class Game {
    @Prop({ required: true })
    period: string;

    @Prop({ required: true ,default:0})
    price: number;

    @Prop({ required: true })
    number: number;

    @Prop({ required: true })
    result: string
}

export const GameSchema = SchemaFactory.createForClass(Game);