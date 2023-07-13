import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({collection : "Users"})
export class User {

  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @Prop()
  username!: string;

  @Prop()
  password!: string;

  @Prop()
  profilePicture!: string;

  @Prop()
  region!: string;
  

 
}

export const UserSchema = SchemaFactory.createForClass(User);