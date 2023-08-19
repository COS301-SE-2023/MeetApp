import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class CreateAttendanceDto {

  @ApiProperty({description: "The unique ID of the organisation whose event is attended", example: "648afceb1d6972212e2ac43b", required: true, type: "string"})
  readonly organisationID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the event being attended", example: "6494b7d2d53259fc23bc0cfd", required: true, type: "string"})
  readonly eventID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the user who is attending the event", example: "64722495cd65fc66879f3ddd", required: true, type: "string"})
  @ApiProperty({description: "", example: "", required: true})
  readonly userID!: mongoose.Schema.Types.ObjectId;
}
