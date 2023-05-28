import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/utils/enums';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type EventDocument = HydratedDocument<Event>;

@Schema({collection : "Events"})
export class Event {
    @Prop()
    ID: mongoose.Schema.Types.ObjectId;
  
    @Prop()
    name: string;
  
    @Prop()
    organisation: string;
  
    @Prop()
    description: string;
  
    @Prop()
    date: string;
  
    @Prop()
    startTime: string;
  
    @Prop()
    endTime: string;
  
    @Prop(raw({
      lng: { type: Number },
      lat: { type: Number }
    }))
    location: Record<number,any>;
  
    @Prop()
    category: Category;
  
    @Prop()
    region: string;
  
}

export const EventSchema = SchemaFactory.createForClass(Event);