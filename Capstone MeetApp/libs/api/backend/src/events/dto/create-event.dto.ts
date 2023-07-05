enum Category {
    TECHNOLOGY = 'Techology',
    MARKETING = 'Marketing',
    HEALTHCARE = 'Healthcare',
    FINANCE = 'Finance',
    BUSINESS = 'Business',
    CONFERENCE = 'Conference',
    WORKSHOP = 'Workshop',
    SEMINAR = 'Seminar',
    TRADESHOW = 'Trade Show',
    NETWORKING = 'Networking',
    FESTIVAL = 'Festival',
    CHARITY = 'Charity',
    SPORTS = 'Sports',
    SOCIALGATHERING = 'Social Gathering',
    WEBINAR = 'Webinar',
    EXPO = 'Expo',
    GALA = 'Gala',
    RETREAT = 'Retreat',
    PRODUCTLAUNCH = 'Product Launch',
    ARTEXHIBITION = 'Art Exhibition',
    MUSICCONCERT = 'Music Concert',
    HACKATHON = 'Hackathon',
    TRADECONVENTION = 'Trade Convention',
    EDUCATION = 'Education',
  }

export class CreateEventDto {
   
    readonly name!: string;
    
    readonly organisation!: string;
    
    readonly description!: string;

    readonly date!: string;
   
    readonly startTime!: string;
 
    readonly endTime!: string;
    
    readonly location!: {latitude:number , longitude:number};

    readonly category!: string; 

    readonly region!: string;

}

