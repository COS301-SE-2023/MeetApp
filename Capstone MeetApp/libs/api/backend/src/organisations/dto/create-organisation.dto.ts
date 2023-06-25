import { IsNotEmpty, IsString, MaxLength , MinLength} from "class-validator";

export class CreateOrganisationDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsNotEmpty()
    readonly password!: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email!: string;

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly phoneNumber!: string;
    
    @IsNotEmpty() 
    readonly events!: string[];

}
