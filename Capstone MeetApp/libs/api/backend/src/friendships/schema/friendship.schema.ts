
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type FriendshipDocument = HydratedDocument<Friendship>;

@Schema({collection : "Friendships"})
export class Friendship {

  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @Prop( /*{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}*/)
  requester!: string;

  @Prop( /*{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}*/)
  requestee!: string;
  @Prop()
  status!: string;

 
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);