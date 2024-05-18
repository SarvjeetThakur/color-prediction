import { IsBoolean } from "class-validator";

export class CreateGameDto {
    @IsBoolean()
    createNew: boolean;
}
