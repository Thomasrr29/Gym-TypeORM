import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    schedule: string

    @IsNumber({}, {each: true})
    @ArrayNotEmpty()
    userIds: number[]

    @IsNumber()
    @IsNotEmpty()
    membershipId: number

    @IsNumber()
    @IsNotEmpty()
    coachId: number

}
