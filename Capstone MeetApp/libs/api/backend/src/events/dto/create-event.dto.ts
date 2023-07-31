export class CreateEventDto {
   
    readonly name!: string;
    
    readonly organisation!: string;
    
    readonly description!: string;

    readonly eventPoster!: string;

    readonly date!: string;
   
    readonly startTime!: string;
 
    readonly endTime!: string;
    
    readonly location!: {latitude:number , longitude:number};

    readonly category!: string; 

    readonly region!: string;

}
