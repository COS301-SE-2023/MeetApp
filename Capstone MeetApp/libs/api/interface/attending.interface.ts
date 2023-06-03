import { Document } from 'mongoose';

export interface IAttending extends Document {
  readonly ID: string;
  readonly name: string;
  readonly eventList: { id: string; name: string }[];
  readonly numAttending : number
}