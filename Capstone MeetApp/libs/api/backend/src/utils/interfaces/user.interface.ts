/* eslint-disable prettier/prettier */
import { IEvents } from './events.interface'; 

export interface IUser {
  ID: string;
  username: string;
  password: string;
  profilePicture: string;
  region: string;
  eventsAttending: IEvents;
  friends: IUser[];


}
