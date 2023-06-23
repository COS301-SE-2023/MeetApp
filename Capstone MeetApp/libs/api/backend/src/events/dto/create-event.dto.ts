import { IsNotEmpty, IsString, MaxLength} from 'class-validator';
export class CreateEventDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly organisation: string;
    
    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly description: string;
    
    @IsString()
    @IsNotEmpty()
    readonly eventPoster : string;
    
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly date: string;
   
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly startTime: string;
    
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly endTime: string;
    
    @IsNotEmpty()
    readonly location: {latitude:string , longitude:string};
    
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly category: string; 

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly region: string;

}
