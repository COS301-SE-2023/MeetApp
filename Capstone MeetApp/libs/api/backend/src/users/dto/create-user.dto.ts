import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: "user_man23", description : "The user's desired username.", required: true})
  readonly username!: string;
  @ApiProperty({example: "password101", description : "The user's chosen password.", required: true})
  readonly password!: string;
  @ApiProperty({example: "em=e?vftb+asi...", description : "Base64/BSON representation of profile picture.", required: true})
  readonly profilePicture!: string;
  @ApiProperty({example: "Joburg", description : "The user's current region.", required: true})
  readonly region!: string;

  @ApiProperty({example: ["Technology, Music, Art"], description : "A list of event categories a user is interested in", required: false})
  readonly interests?: string[];
  
}
