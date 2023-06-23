import { IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly username!: string;

    @IsString()
    @MaxLength(50)
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

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly phoneNumber!: string;

    @IsNotEmpty() 
    readonly location!: {latitude :string, longitude:string};

    @IsNotEmpty() 
    readonly events!: string[];

}


