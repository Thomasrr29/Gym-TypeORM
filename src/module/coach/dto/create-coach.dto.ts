import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCoachDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    groupId: number
}
