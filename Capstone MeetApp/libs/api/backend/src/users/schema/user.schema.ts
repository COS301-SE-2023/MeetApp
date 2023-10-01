import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({collection : "Users"})
export class User {
  static insertMany(testUsers: User[]) {
    throw new Error('Method not implemented.');
  }

  @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's ID as in the database.", type: "string", required: true})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

  @ApiProperty({example: "user_man23@gmail.com", description : "The user's email address.", required: true})
  @Prop()
  emailAddress!: string;

  @ApiProperty({example: "user_man23", description : "The user's desired username.", required: true})
  @Prop()
  username!: string;

  @ApiProperty({example: "password101", description : "The user's chosen password.", required: true})
  @Prop()
  password!: string;

  @ApiProperty({example: "em=e?vftb+asi...", description : "Base64/BSON representation of profile picture.", required: true})
  @Prop()
  profilePicture!: string;

  @ApiProperty({example: "Joburg", description : "The user's current region.", required: true})
  @Prop()
  region!: string;
  
  @ApiProperty({example: ["Technology, Music, Art"], description : "A list of event categories a user is interested in", required: false})
  @Prop({default: []})
  interests?: string[];

 
}

export const UserSchema = SchemaFactory.createForClass(User);