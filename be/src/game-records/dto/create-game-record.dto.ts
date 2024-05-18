import { IsOptional, IsString } from "class-validator";

export class CreateGameRecordDto {
    @IsString()
    userId: string;

    @IsString()
    color: string;

    @IsOptional()
    number: string;

};
