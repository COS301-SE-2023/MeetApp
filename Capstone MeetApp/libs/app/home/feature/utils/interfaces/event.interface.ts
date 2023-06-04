import { ILocation } from "./location.interface";
import { Category } from "../enums";

export interface IEvent {
  ID: string;
  organisation: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  totalAttendees : number;
  location : ILocation;
  category: Category;
  region : string;
}