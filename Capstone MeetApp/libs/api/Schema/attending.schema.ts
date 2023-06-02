import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Attending {
  @Prop()
  ID: string;

  @Prop()
  name: string;

  @Prop([{ id: String, name: String }])
  eventList: { id: string; name: string }[];

  @Prop()
  numAttending : number
  

}

export const AttendingSchema = SchemaFactory.createForClass(Attending);