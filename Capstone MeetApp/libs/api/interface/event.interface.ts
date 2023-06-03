import { Document } from 'mongoose';

export interface IEvent extends Document {
  readonly ID: string;
  readonly organisation: string;
  readonly description: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly totalAttendees: number;
  readonly location: { lg: string; lat: string };
  readonly category: string;
  readonly region: string;
}
