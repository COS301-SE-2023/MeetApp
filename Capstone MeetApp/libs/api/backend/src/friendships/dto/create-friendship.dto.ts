import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendshipDto{

    @ApiProperty({example: "659223dedd65fe64879e13dc", description : "The ID of the user who sent the request as in the database.", type: "string"})
    readonly requester!:string;

    @ApiProperty({example: "64722495cd65fc66879f3ddd", description : "The ID of the user who received the request as in the database.", type: "string"})
    readonly requestee!:string;

    @ApiProperty({example: "false", description : "Whether the friendship request was accepted or not.", type: "boolean"})
    readonly status!:string;
    
}
