import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @IsNotEmpty()
    cellphone: number

    @IsNumber()
    @IsNotEmpty()
    membershipId: number

    @IsNumber()
    @IsNotEmpty()
    coachId: number

    @IsString()
    @IsNotEmpty()
    role: 'admin' | 'coach' | 'user' 
}
