import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: "user_man23", description : "The user's desired username."})
  readonly username!: string;
  @ApiProperty({example: "password101", description : "The user's chosen password."})
  readonly password!: string;
  @ApiProperty({example: "em=e?vftb+asi...", description : "Base64/BSON representation of profile picture."})
  readonly profilePicture!: string;
  @ApiProperty({example: "Joburg", description : "The user's current region."})
  readonly region!: string;
  
}
