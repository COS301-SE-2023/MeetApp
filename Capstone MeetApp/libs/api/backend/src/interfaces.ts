import { ApiProperty } from "@nestjs/swagger";

export class AuthenticatedRequest extends Request {
    readonly user!: {id : string, username : string, password: string};
  }

export class UserLoginRequest {

    @ApiProperty({description : 'An existing username.', example: 'john_doe'})
     readonly username! : string;

    @ApiProperty({description : 'The password associated with username.', example: 'pass123'})
    readonly password! : string;
  }