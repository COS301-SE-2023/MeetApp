import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Socials {
  @Prop()
  iD: string;

  @Prop([{ id: String, name: String }])
  Following: { id: string; name: string }[];

  @Prop()
  numFollowings : number

  @Prop([{ id: String, name: String }])
  Followers: { id: string; name: string }[];

  @Prop()
  numFollowers : number

  @Prop()
  name: string;
}

export const SocialsSchema = SocialsFactory.createForClass(Socials);