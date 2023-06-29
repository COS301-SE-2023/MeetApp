import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({collection : "Attendance"})
export class Attendance {

  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @Prop()
  organisationID!: mongoose.Schema.Types.ObjectId;

  @Prop()
  eventID!: mongoose.Schema.Types.ObjectId;

  @Prop()
  userID!: mongoose.Schema.Types.ObjectId;

}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);