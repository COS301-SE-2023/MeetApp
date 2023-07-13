import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from '../../utils/enums';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type EventDocument = HydratedDocument<Event>;

@Schema({collection : "Events"})
export class Event {
    @Prop()
  ID!: mongoose.Schema.Types.ObjectId;
  
    @Prop()
  name!: string;
  
    @Prop()
  organisation!: string;
  
    @Prop()
  description!: string;
  
    @Prop()
  eventPoster!: string;
  
    @Prop()
  date!: string;
  
    @Prop()
  startTime!: string;
  
    @Prop()
  endTime!: string;
  
    @Prop(raw({
    longatude: { type: Number },
    latitude: { type: Number }
  }))
  location!: Record<number, unknown>;
  
    @Prop()
  category!: string; //Build errors when Category enum used
  
    @Prop()
  region!: string;
  
}

export const EventSchema = SchemaFactory.createForClass(Event);