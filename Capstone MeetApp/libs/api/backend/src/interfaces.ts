//import { Request } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from '@nestjs/common';
import mongoose from "mongoose";

export interface AuthenticatedRequest extends Request {
    //@ApiProperty({description: "The user's credentials", example: {id: "747223dedd65fc64879e13dc", username: "TimothyJones24", password: "pass435"}})
     user: {id : string, username : string, password: string};
  }

export class AuthenticatedRequestClass {
    @ApiProperty({description: "The user's credentials", example: {id: "747223dedd65fc64879e13dc", username: "TimothyJones24", password: "pass435"}, type : 'OrderedMap'})
     readonly user!: {id : string, username : string, password: string};
  }

export class UserLoginRequest {

    @ApiProperty({description : 'An existing username.', example: 'john_doe'})
     readonly username! : string;

    @ApiProperty({description : 'The password associated with username.', example: 'pass123'})
    readonly password! : string;
  }

  export class UserFriends {

    @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's desired username.", type: "string"})
    readonly ID!: mongoose.Schema.Types.ObjectId;

    @ApiProperty({description : 'An existing username.', example: 'john_doe'})
    readonly username! : string;

    @ApiProperty({example: "em=e?vftb+asi...", description : "Base64/BSON representation of profile picture."})
    readonly profilePicture!: string;
  }