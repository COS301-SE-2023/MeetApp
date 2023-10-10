import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type PendingAccountDocument = HydratedDocument<PendingAccount>;

@Schema({collection : "PendingAccounts"})
export class PendingAccount {

  @ApiProperty({description: "The unique ID of the pending account", example: "64a468efee5caf10d55af634", required: true, type: "string"})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The email address of the pending account", example: "pending@gmail.com", required: true, type: "string"})
  @Prop()
  readonly emailAddress!: string;

  @ApiProperty({description: "The username of the pending account", example: "TimJones23", required: true, type: "string"})
  @Prop()
  readonly username!: string;


  @ApiProperty({description: "The unique 6-digit pin sent to the user's email address", example: "783451", required: true, type: "number"})
  @Prop()
  readonly OTP!: number;

  @ApiProperty({description: "The type of account trying to be created", example: "User", required: true, type: "string"})
  @Prop()
  readonly type!: string;

  @ApiProperty({description: "Whether the account has been verified or not", example: "false", required: true, type: "boolean"})
  @Prop()
  readonly verified!: boolean;

}

export const PendingAccountSchema = SchemaFactory.createForClass(PendingAccount);