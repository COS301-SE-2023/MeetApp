//import { Request } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Request } from '@nestjs/common';

export interface AuthenticatedRequest extends Request {
    //@ApiProperty({description: "The user's credentials", example: {id: "747223dedd65fc64879e13dc", username: "TimothyJones24", password: "pass435"}})
     user: {id : string, username : string, password: string};
  }

export class AuthenticatedRequestClass {
    @ApiProperty({description: "The user's credentials", example: {id: "747223dedd65fc64879e13dc", username: "TimothyJones24", password: "pass435"}})
     readonly user!: {id : string, username : string, password: string};
  }

export class UserLoginRequest {

    @ApiProperty({description : 'An existing username.', example: 'john_doe'})
     readonly username! : string;

    @ApiProperty({description : 'The password associated with username.', example: 'pass123'})
    readonly password! : string;
  }