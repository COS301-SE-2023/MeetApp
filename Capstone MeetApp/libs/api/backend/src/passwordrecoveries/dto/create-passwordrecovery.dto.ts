import { ApiProperty } from "@nestjs/swagger";

export class CreatePasswordRecoveryDto {

  @ApiProperty({description: "The email at which the link is sent", example: "user1@gmail.com", required: true, type: "string"})
  readonly emailAddress!: string;

  @ApiProperty({description: "The unique token to verify the user", example: "eyJhbGciOiJIUzI1NiIs...", required: true, type: "string"})
  readonly token!: string;

  @ApiProperty({description: "The time at which the token expires", example: Date.now(), required: true, type: "number"})
  readonly expiration!: number;
}
