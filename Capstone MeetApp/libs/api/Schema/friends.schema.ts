import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Friends {
  @Prop()
  iD: string;

  @Prop([{ id: String, name: String }])
  Following: { id: string; name: string }[];

  @Prop([{ id: String, name: String }])
  Followers: { id: string; name: string }[];

  @Prop()
  name: string;
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
