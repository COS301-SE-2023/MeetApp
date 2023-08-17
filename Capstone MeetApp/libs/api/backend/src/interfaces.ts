//import { Request } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from '@nestjs/common';
import mongoose from "mongoose";

export interface AuthenticatedRequest extends Request {
    //@ApiProperty({description: "The user's credentials", example: {id: "747223dedd65fc64879e13dc", username: "TimothyJones24", password: "pass435"}})
     user: {id : string, username : string, password: string};
  }

export class UserAccountInfo {
  @ApiProperty({example: "747223dedd65fc64879e13dc", description : "The user's desired username.", type: "string"})
     readonly id! : string;
     @ApiProperty({example: "user_man23", description : "The user's desired username."})
     readonly username! : string;
     @ApiProperty({example: "password101", description : "The user's chosen password."})
     readonly password! : string;
     @ApiProperty({example: 1516239022, description : "A number showing when the access was granted."})
     readonly iat! : number;
     @ApiProperty({example: 1516245960, description : "A number showing when the access will be expired."})
     readonly exp!: number;
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

  export class UnfriendBody {
    @ApiProperty({example : {friend : "647223dedd65fc64879e13dc"}, description: "The ID of the friend a logged-in user wants to remove", type: "OrderedMap"})
    readonly friendID! : {friend : string}
  }