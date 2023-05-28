/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/utils/enums';
//import { ILocation } from 'src/utils/interfaces/location.interface';

export type EventDocument = HydratedDocument<Event>;

@Schema({collection : "Events"})
export class Event {

  
}

export const EventSchema = SchemaFactory.createForClass(Event);