import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganisationDto {
    
    @ApiProperty({description: "The chosen username of the organisation", example: "techTuks", required: true})
    readonly username!: string;

    @ApiProperty({description: "The chosen password of the organisation", example: "thetitans", required: true})
    readonly password!: string;

    @ApiProperty({description: "The name of the organisation", example: "Tech Titans", required: true})
    readonly name!: string;

    @ApiProperty({description: "The list of events (specifically their IDs) posted by the organisation", example: ["647219bfcd65fc66878d5997","6472190bcd65fc66878c3ede","6472194ecd65fc66878ca8b4"], required: true, type : "array"})
    readonly events!: string[];
}
