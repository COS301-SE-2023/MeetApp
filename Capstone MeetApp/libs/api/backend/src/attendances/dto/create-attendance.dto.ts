import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class CreateAttendanceDto {

  @ApiProperty({description: "", example: "", required: true})
  readonly organisationID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "", example: "", required: true})
  readonly eventID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "", example: "", required: true})
  readonly userID!: mongoose.Schema.Types.ObjectId;
}
