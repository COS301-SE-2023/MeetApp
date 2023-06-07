import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AttendancesDocument = HydratedDocument<Attendances>;

@Schema({collection : "Attendance"})
export class Attendances {

  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @Prop()
  organisationID :  mongoose.Schema.Types.ObjectId;

  @Prop()
  eventID :  mongoose.Schema.Types.ObjectId;

  @Prop()
  userID :  mongoose.Schema.Types.ObjectId;
 
}

export const AttendancesSchema = SchemaFactory.createForClass(Attendances);