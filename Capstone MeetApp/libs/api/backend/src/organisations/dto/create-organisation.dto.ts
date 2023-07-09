export class CreateOrganisationDto {
    
    readonly name!:string;
    readonly surname!:string;
    readonly username!: string;
    readonly email!:string;
    readonly password!: string;
    readonly phoneNumber!:string;
    readonly orgDescription!:string;
    readonly events!: string[];
    
}
