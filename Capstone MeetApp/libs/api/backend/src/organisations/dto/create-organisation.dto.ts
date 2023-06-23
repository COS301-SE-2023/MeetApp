import { IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateOrganisationDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username!: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly password!: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name!: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly email!: string;

    @IsNotEmpty() 
    readonly location!: {latitude : string ,longitude: string };

    @IsNotEmpty() 
    readonly events!: string[];

}
