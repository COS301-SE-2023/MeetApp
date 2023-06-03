import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Attendance {
  @Prop()
  ID: string;

  @Prop()
  name: string;

  @Prop([{ id: String, name: String }])
  eventList: { id: string; name: string }[];

  @Prop()
  numAttending : number
  
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);