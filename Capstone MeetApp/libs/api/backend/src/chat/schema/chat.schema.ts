import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({collection : "Chats"})
export class Chat {

  @ApiProperty({description: "The unique ID of the chat", example: "64a468efee5caf10d55af634", required: true, type: "string"})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The unique ID of the chat room", example: "room-648afceb1d6972212e2ac43b", required: true, type: "string"})
  @Prop()
  roomID!: string;

  @ApiProperty({description: "The unique ID of the organisation hosting the chat", example: "6494b7d2d53259fc23bc0cfd", required: true, type: "string"})
  @Prop()
  organisationID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "A list of messages (and their details) sent in the chat room", example: {content : 'This even is pretty cool', sender : '6494b7d2d53259fc23bc0cfd', timestamp : ""}, required: true, type: "OrderedMap"})
  @Prop()
  messages!: {content : string; sender : string, timestamp : string}[];

  @ApiProperty({description: "A list of unique IDs of user who were removed during the chat", example: "[64722495cd65fc66879f3ddd, 6494b7d2d53259fc23bc0cfd]", required: true, type: "string[]"})
  @Prop()
  bannedUsers!: string[];

}

export const ChatSchema = SchemaFactory.createForClass(Chat);