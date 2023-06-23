import {IsNotEmpty , IsString} from "class-validator";

export class CreateFriendshipDto {

    @IsNotEmpty()
    @IsString()
    readonly requester!: string;

    @IsNotEmpty()
    @IsString()
    readonly requestee!: string;
    
    @IsNotEmpty()
    @IsString()
    readonly status!: string;
      
}
