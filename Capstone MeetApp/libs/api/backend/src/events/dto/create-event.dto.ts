export class CreateEventDto {
   
    readonly name!: string;
    
    readonly organisation!: string;
    
    readonly description!: string;

    readonly date!: string;
   
    readonly startTime!: string;
 
    readonly endTime!: string;
    
    readonly location!: {latitude:string , longitude:string};

    readonly category!: string; 

    readonly region!: string;

}