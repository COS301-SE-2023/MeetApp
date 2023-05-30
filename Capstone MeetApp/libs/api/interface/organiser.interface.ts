import { Document } from 'mongoose';

export interface IOrganiser extends Document {
  readonly ID: string;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly phoneNumber: string;
  readonly location: { lg: string; lat: string };
}
