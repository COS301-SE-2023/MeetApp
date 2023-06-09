import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model, FilterQuery } from 'mongoose';



@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>)
  {

  }
  async create(createEventDto: CreateEventDto) {
    const newEvent = await new this.eventModel(createEventDto);
    return newEvent.save();
  }
  findAll() {
    return this.eventModel.find().exec();
  }

  findByQuery(queryIN : FilterQuery<Event>) {
    return this.eventModel.find(queryIN).exec();
  }


  findOne(id: string) {
    //const ObjectIdfromString = ObjectId.createFromHexString(id)
    return this.eventModel.findById(id).exec(); 
  }

  findbyOrganisation(INorganisation: string) {
    return this.eventModel.find({organisation: INorganisation})
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const existingEvent = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
   if (!existingEvent) {
     throw new NotFoundException(`Event #${id} not found`);
   }
   return existingEvent;
  }
  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
