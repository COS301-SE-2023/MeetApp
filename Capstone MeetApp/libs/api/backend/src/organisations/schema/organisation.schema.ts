import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type OrganisationDocument = HydratedDocument<Organisation>;

@Schema({collection : "Organisations"})
export class Organisation {

  @ApiProperty({description: "The unique ID of the organisation", example: "64723154d01ba2f73db88fe0", required: true, type: "string"})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({description: "The chosen username of the organisation", example: "techTuks", required: true})
  @Prop()
  username!: string;

  @ApiProperty({description: "The chosen password of the organisation", example: "thetitans", required: true})
  @Prop()
  password!: string;

  @ApiProperty({description: "The name of the organisation", example: "Tech Titans", required: true})
  @Prop()
  name!: string;

  @ApiProperty({description: "The list of events (specifically their IDs) posted by the organisation", example: ["647219bfcd65fc66878d5997","6472190bcd65fc66878c3ede","6472194ecd65fc66878ca8b4"], required: true, type : "array"})
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }])
  events!: string[];

 
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);