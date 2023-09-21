import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type PasswordRecoveryDocument = HydratedDocument<PasswordRecovery>;

@Schema({collection : "PasswordRecoveries"})
export class PasswordRecovery {

  @ApiProperty({description: "The unique ID of the password recovery", example: "64a468efee5caf10d55af634", required: true, type: "string"})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The email at which the link is sent", example: "user1@gmail.com", required: true, type: "string"})
  @Prop()
  emailAddress!: string;

  @ApiProperty({description: "The unique token to verify the user", example: "eyJhbGciOiJIUzI1NiIs...", required: true, type: "string"})
  @Prop()
  token!: string;

  @ApiProperty({description: "The time at which the token expires", example: Date.now(), required: true, type: "number"})
  @Prop()
  expiration!: number;

}

export const PasswordRecoverySchema = SchemaFactory.createForClass(PasswordRecovery);