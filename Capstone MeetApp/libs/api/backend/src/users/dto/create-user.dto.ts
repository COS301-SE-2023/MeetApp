import { IsNotEmpty, IsString, MaxLength ,IsArray} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    readonly ID: mongoose.Schema.Types.ObjectId;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty() 
    readonly location: Record<number, unknown>;

    @IsArray()
    @IsNotEmpty() 
    readonly events: string[];
    
}


