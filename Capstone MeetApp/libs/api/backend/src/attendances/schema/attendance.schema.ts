import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({collection : "Attendance"})
export class Attendance {

  @ApiProperty({description: "The unique ID of the attendance", example: "64a468efee5caf10d55af634", required: true, type: "string"})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the organisation whose event is attended", example: "648afceb1d6972212e2ac43b", required: true, type: "string"})
  @Prop()
  organisationID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the event being attended", example: "6494b7d2d53259fc23bc0cfd", required: true, type: "string"})
  @Prop()
  eventID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the user who is attending the event", example: "64722495cd65fc66879f3ddd", required: true, type: "string"})
  @Prop()
  userID!: mongoose.Schema.Types.ObjectId;

}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);