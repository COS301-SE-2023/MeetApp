import { IsNotEmpty, IsString, MaxLength} from 'class-validator';
export class CreateEventDto {
   
    @IsNotEmpty()
    readonly ID: mongoose.Schema.Types.ObjectId;
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly organisation: string;
    
    @IsString()
    @MaxLength(250)
    @IsNotEmpty()
    readonly description: string;
    
    @IsString()
    @IsNotEmpty()
    readonly eventPoster string;
    
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
    readonly location: Record<number, unknown>;
    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly category: string; 

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly region: string;

}
