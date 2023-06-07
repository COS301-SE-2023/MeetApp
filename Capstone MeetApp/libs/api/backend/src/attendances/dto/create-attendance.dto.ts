import {IsNotEmpty} from "class-validator";

export class CreateAttendanceDto {

    @IsNotEmpty()
    readonly ID: string;
    
    @IsNotEmpty()
    readonly organisationID: string;

    @IsNotEmpty()
    readonly eventID: string;
    
    @IsNotEmpty()
    readonly userID: string;
}
