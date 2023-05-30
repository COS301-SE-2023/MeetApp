import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Organiser {
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
  location: { lg: String, lat: String }

}

export const OrganiserSchema = SchemaFactory.createForClass(Organiser);



