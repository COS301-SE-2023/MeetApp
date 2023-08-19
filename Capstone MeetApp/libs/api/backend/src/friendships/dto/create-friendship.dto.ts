import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendshipDto{

    @ApiProperty({example: "659223dedd65fe64879e13dc", description : "The ID of the user who sent the request as in the database.", type: "string"})
    readonly requester!:string;

    @ApiProperty({example: "619e73defd65ce648e9e63fc", description : "The ID of the user who received the request as in the database.", type: "string"})
    readonly requestee!:string;

    @ApiProperty({example: "false", description : "Whether the friendship request was accepted or not.", type: "boolean"})
    readonly status!:string;
    
}
