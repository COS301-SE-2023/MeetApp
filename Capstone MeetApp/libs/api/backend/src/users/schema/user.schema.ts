import { Prop, Schema, SchemaFactory ,raw} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type OrganisationDocument = HydratedDocument<Users>;

@Schema({collection : "Users"})
export class Users {

  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @Prop()
  username!: string;

  @Prop()
  password!: string;

  @Prop()
  name!: string;

  @Prop()
  email!: string;

  @Prop(raw({
    lng: { type: Number },
    lat: { type: Number }
  }))
  location!: Record<number, unknown>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }])
  events!: string[];


 
}

export const UsersSchema = SchemaFactory.createForClass(Users);