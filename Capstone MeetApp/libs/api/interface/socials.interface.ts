import { Document } from 'mongoose';

export interface ISocials extends Document {
  readonly iD: string;
  readonly name: string;
  readonly Following: { id: string; name: string }[];
  readonly numFollowings : number;
  readonly Followers: { id: string; name: string }[];
  readonly numFollowers : number;
  
}
