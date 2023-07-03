export class CreateUserDto {

  readonly name!:string;
  readonly surname!:string;
  readonly username!: string;
  readonly email!:string;
  readonly password!: string;
  readonly phoneNumber!:string;
  readonly interests!:string[];
  readonly region!: string;
  readonly profilePicture!: string;

}
