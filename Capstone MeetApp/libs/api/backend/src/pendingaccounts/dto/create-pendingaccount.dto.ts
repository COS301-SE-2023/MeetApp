import { ApiProperty } from "@nestjs/swagger";

export class CreatePendingAccountDto {

  @ApiProperty({description: "The email address of the pending account", example: "pending@gmail.com", required: true, type: "string"})
  readonly emailAddress!: string;

  @ApiProperty({description: "The unique 6-digit pin sent to the user's email address", example: "783451", required: true, type: "number"})
  readonly OTP!: number;

  @ApiProperty({description: "The type of account trying to be created", example: "User", required: true, type: "string"})
  readonly type!: string;

  @ApiProperty({description: "Whether the account has been verified or not", example: "false", required: true, type: "boolean"})
  readonly verfied!: boolean;
}
