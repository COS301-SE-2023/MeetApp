import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type OrganisationDocument = HydratedDocument<Organisation>;

@Schema({collection : "Organisations"})
export class Organisation {

  @Prop()
  ID: mongoose.Schema.Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Events'}])
  events: string[];

 
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);