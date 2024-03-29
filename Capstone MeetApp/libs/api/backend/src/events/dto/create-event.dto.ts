import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
   
    @ApiProperty({example: 'CyberSummit', description: 'The name of the event.', required: true})
    readonly name!: string;
    
    @ApiProperty({example: 'TechSummit Corporation', description: 'The name of the organisation (existing) hosting the event.', required: true})
    readonly organisation!: string;
    
    @ApiProperty({example: 'Join us as we embark on a journey through the world of networks and their number one enemy: Hackers!', description: 'A short description of the event.', required: true})
    readonly description!: string;

    @ApiProperty({example: 'as9frfr=cwc?Evt...', description: 'A Base64/BSON representation of the event poster image', required: true})
    readonly eventPoster!: string;

    @ApiProperty({example: '2023-10-11', description: 'The date of the event in yyyy-mm-dd format.', required: true})
    readonly date!: string;
   
    @ApiProperty({example: '17:20', description: 'The time at which the event begins in hh:mm format (24h).', required: true})
    readonly startTime!: string;
 
    @ApiProperty({example: '20:00', description: 'The time at which the event ends in hh:mm format (24h).', required: true})
    readonly endTime!: string;
    
    @ApiProperty({example: {latitude : 51.5074, longitude : -0.1278}, description: 'The location of the event in longitude and latitude.', type : 'OrderedMap', required: true})
    readonly location!: {latitude:number , longitude:number};

    @ApiProperty({example: 'Technology', description: 'The category of the event.', required: true})
    readonly category!: string; 

    @ApiProperty({example: 'Pretoria', description: 'Where the event will be hosted.', required: true})
    readonly region!: string;

}
