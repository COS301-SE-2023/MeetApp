import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Event {
  @Prop()
  ID: string;

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

  @Prop()
  totalAttendees: number;

  @Prop({ lg: String, lat: String })
  location: { lg: String; lat: String };

  @Prop()
  category: string;

  @Prop()
  region: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
