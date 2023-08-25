import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
//import { Category } from 'src/utils/enums';
//import { Organisation } from '../entities/organisation.entity';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({collection : "Users"})
export class User {

  @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's ID as in the database.", type: "string", required: true})
  @Prop()
  ID!: mongoose.Schema.Types.ObjectId;

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
  

 
}

export const UserSchema = SchemaFactory.createForClass(User);