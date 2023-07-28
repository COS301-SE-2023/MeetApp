import mongoose from "mongoose";

export class CreateAttendanceDto {

  readonly ID!: mongoose.Schema.Types.ObjectId;
  readonly organisationID!: mongoose.Schema.Types.ObjectId;
  readonly eventID!: mongoose.Schema.Types.ObjectId;
  readonly userID!: mongoose.Schema.Types.ObjectId;
}
