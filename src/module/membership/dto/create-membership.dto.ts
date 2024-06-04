import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateMembershipDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => new Date(value))
    startDate: Date

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => new Date(value))
    endDate: Date

    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    groupId: number
}
