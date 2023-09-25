import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from '../../utils/enums';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type EventDocument = HydratedDocument<Event>;

@Schema({collection : "Events"})
export class Event {
  @ApiProperty({description: "The unique ID of the event.", example: "6494b7d2d53259fc23bc0cfd", required: true, type: "string"})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;
  
  @ApiProperty({example: 'CyberSummit', description: 'The name of the event.', required: true})
  @Prop()
  name!: string;
  
  @ApiProperty({example: 'TechSummit Corporation', description: 'The name of the organisation (existing) hosting the event.', required: true})
  @Prop()
  organisation!: string;
  
  @ApiProperty({example: 'Join us as we embark on a journey through the world of networks and their number one enemy: Hackers!', description: 'A short description of the event.', required: true})
  @Prop()
  description!: string;
  
  @ApiProperty({example: 'as9frfr=cwc?Evt...', description: 'A Base64/BSON representation of the event poster image', required: true})
  @Prop()
  eventPoster!: string;
  
  @ApiProperty({example: '2023-10-11', description: 'The date of the event in yyyy-mm-dd format.', required: true})
  @Prop()
  date!: string;
  
  @ApiProperty({example: '17:20', description: 'The time at which the event begins in hh:mm format (24h).', required: true})
  @Prop()
  startTime!: string;
  
  @ApiProperty({example: '20:00', description: 'The time at which the event ends in hh:mm format (24h).', required: true})
  @ApiProperty({description: "", example: "", required: true})
  @Prop()
  endTime!: string;
  
  @ApiProperty({example: {latitude : 51.5074, longitude : -0.1278}, description: 'The location of the event in longitude and latitude.', type : 'OrderedMap', required: true})
  @ApiProperty({description: "", example: "", required: true})
  @Prop(raw({
  longitude: { type: Number },
  latitude: { type: Number }
  }))
  location!: Record<number, unknown>;
  
  
  @ApiProperty({example: 'Technology', description: 'The category of the event.', required: true})
  @Prop()
  category!: string; //Build errors when Category enum used
  
  @ApiProperty({example: 'Pretoria', description: 'Where the event will be hosted.', required: true})
  @Prop()
  region!: string;
  
}

export const EventSchema = SchemaFactory.createForClass(Event);