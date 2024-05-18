import { IsNumber, IsString } from "class-validator";

export class UpdateWalletDto {
  @IsString()
  userId: string;
  @IsString()
  actionType: 'add' | 'deduct';
  @IsNumber()
  amount: number;
}
