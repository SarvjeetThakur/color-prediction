import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
    @Prop({ required: true, type: String })
    userId: string
    @Prop({ required: false, type: Number, default: 0 })
    amount: number
    @Prop({ required: false, type: Boolean, default: false })
    haveWallet: number
};

export const walletSchema = SchemaFactory.createForClass(Wallet);