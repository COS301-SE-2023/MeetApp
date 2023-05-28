import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model, Mongoose } from 'mongoose';
import { ObjectId } from 'mongodb';
import { query } from 'express';


@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>)
  {

  }
  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return this.eventModel.find().exec();
  }

  findOne(id: string) {
    //const ObjectIdfromString = ObjectId.createFromHexString(id)
    return this.eventModel.findById(id).exec(); 
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
