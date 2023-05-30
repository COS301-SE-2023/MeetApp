import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  ID: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({ lg: String, lat: String })
  location: { lg: string; lat: string };
}

export const UserSchema = SchemaFactory.createForClass(User);
