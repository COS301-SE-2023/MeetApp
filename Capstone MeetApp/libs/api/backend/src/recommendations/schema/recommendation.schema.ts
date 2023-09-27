import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type RecommendationDocument = HydratedDocument<Recommendation>;

@Schema({collection : "Recommendations",})
export class Recommendation {

  @ApiProperty({description: "The unique ID of the user", example: "648afceb1d6972212e2ac43b", required: true, type: "string"})
  @Prop()
  userID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the event being attended", example: "6494b7d2d53259fc23bc0cfd", required: true, type: "string"})
  @Prop()
  weights!: {parameter : string, value: number, rank: number }[];

  @ApiProperty({description: "The unique ID of the user who is attending the event", example: "64722495cd65fc66879f3ddd", required: true, type: "string"})
  @ApiProperty({description: "", example: "", required: true})
  @Prop({default: 0.001})
  rate!: number;

}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);