
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type FriendshipDocument = HydratedDocument<Friendship>;

@Schema({collection : "Friendships"})
export class Friendship {

  @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's ID as in the database.", type: "string", required: true})
  @Prop()
  id!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({example: "659223dedd65fe64879e13dc", description : "The ID of the user who sent the request as in the database.", type: "string", required: true})
  @Prop( /*{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}*/)
  requester!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({example: "619e73defd65ce648e9e63fc", description : "The ID of the user who received the request as in the database.", type: "string", required: true})
  @Prop( /*{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}*/)
  requestee!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({example: "false", description : "Whether the friendship request was accepted or not.", type: "boolean", required: true})
  @Prop({ default: false })
  status!: boolean;

 
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);