import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model, FilterQuery } from 'mongoose';
import { Organisation } from '../organisations/schema';
import { Attendance } from '../attendances/schema';
import { User } from '../users/schema';



@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>, @InjectModel(Organisation.name) private orgModel: Model<Organisation>, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>, @InjectModel(User.name) private userModel: Model<User>)
  {

  }
  async create(createEventDto: CreateEventDto) {
    const newEvent = await new this.eventModel(createEventDto);
    const eventsOrgStringName = newEvent.organisation;
    const eventsID = newEvent._id;
    const OrgDetails = await this.orgModel.find({name: eventsOrgStringName})
    console.log(newEvent)
    if (!OrgDetails)
      return "Organisation not found"
    console.log(OrgDetails)
    const OrgId = OrgDetails[0]._id
    await this.orgModel.updateOne({ _id: OrgId }, { $push: { events: eventsID } });

    return newEvent.save();
  }

  findAll() {
    console.log('Service');
    return this.eventModel.find().exec();
  }

  async getEventAttendanceCount(eventID: string){
    return await this.attendanceModel.countDocuments({ eventID }).exec();
  }

  findByQuery(queryIN : FilterQuery<Event>) {
    return this.eventModel.find(queryIN).exec();
  }

  async fetchEventsByIds(eventIds: string[]) {
    return this.eventModel.find({ _id: { $in: eventIds } }).exec();
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

  getEventsByDateRange(startDate: string, endDate: string) {
    return this.eventModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
  }
  
  async remove(id: string) {
    const deletedEvent = await this.eventModel.findById(id);
   if (!deletedEvent) {
     throw new NotFoundException(`Event #${id} not found`);
   }
   const EventsAtt = await this.attendanceModel.find({eventID  : id}).exec()
   const org = await this.orgModel.findOne({name : deletedEvent.organisation}).exec()
   const payload =  {deleted_resources: {event : deletedEvent, Attendances: EventsAtt, removed_from : org}}
   const resEventsArray = org?.events.filter (e =>  e != id)
   if (resEventsArray){
    const resEventsArrayMapped = resEventsArray.map (e =>  e.toString())
    console.log(resEventsArrayMapped)
    this.eventModel.deleteOne({_id: id}).exec()
    this.attendanceModel.deleteMany({eventID : id}).exec()
    this.orgModel.findByIdAndUpdate(org?._id, {events: resEventsArrayMapped}, { new: true });
   }
   
   return payload;
  }

  async getEventAttendance(eventId: string): Promise<number> {
    const eventAttendanceCount = await this.attendanceModel.countDocuments({ eventID: eventId });
    return eventAttendanceCount;
  }

  async getEventAttendanceAll() {
    const eventAll = await this.eventModel.find({}).exec()
    const AttendancePlusCount = eventAll.map(async cevent => {
      const eventAttendanceCount = await this.attendanceModel.countDocuments({ eventID: cevent._id }); 
      return {event : cevent, attendees : eventAttendanceCount }
    })
    return AttendancePlusCount;
  }

  async getAttendingUsers(eventId: string){
    const attendance = await this.attendanceModel.find({ eventID: eventId }).exec();
    const attendingUserIds = attendance.map((a) => a.userID);
    const users = await this.userModel.find({ _id: { $in: attendingUserIds } }).exec();

    return users.map((user) => ({ id: user._id, username: user.username }));
  }
}
