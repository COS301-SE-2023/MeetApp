import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateOrganisationDto } from './dto/create-organisation.dto';
// import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Organisation } from './schema';
import { Model } from 'mongoose';
import { EventsService } from '../events/events.service';
import { Attendance } from '../attendances/schema';
import { Event } from '../events/schema';

@Injectable()
export class OrganisationsService {
  constructor(@InjectModel(Organisation.name) private organisationModel: Model<Organisation>, private eventService :EventsService, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>, @InjectModel(Event.name) private eventModel: Model<Event>){
    
  }
  // create(createOrganisationDto: CreateOrganisationDto) {
  //   return 'This action adds a new organisation';
  // }

  findAll() {
    return this.organisationModel.find().exec();
  }

  findOne(id: string) {
    //const ObjectIdfromString = ObjectId.createFromHexString(id)
    return this.organisationModel.findById(id).exec(); 
  }

  async findEvents(id: string) {
    const orgDoc = await this.organisationModel.findById(id).exec();
    if (orgDoc){
      const eventsArr = orgDoc.events;
    
  
    const eventPromises = eventsArr.map((currentEventID) =>
      this.eventService.findOne(currentEventID.toString())
    );
  
    const eventInfoArr = await Promise.all(eventPromises);
    console.log(eventInfoArr);
    return eventInfoArr;
    }
    else
      return []
  }

  // update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
  //   NotImplementedException
  //   return `This action updates a #${id} organisation`;
  // }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }

  async getTop3AttendedEvents(organizationId: string) {
    // Find events for the specified organization
    //const org = await this.findOne(organizationId)
    const events = await this.findEvents(organizationId);

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }

    // Sort events by attendance count in descending order
    const sortedEvents = await Promise.all(
      events.map(async (event) => {
        const attendanceCount = await this.attendanceModel.countDocuments({ eventID: event?.ID }).exec();
        return { event, attendanceCount };
      }),
    );
    sortedEvents.sort((a, b) => b.attendanceCount - a.attendanceCount);

    // Return the top 3 most attended events
    const topAttendedEvents = sortedEvents.slice(0, 3).map((item) => item.event);

    return topAttendedEvents;
  }

  async getTopAttendedEvent(organizationId: string) {
    // Find events for the specified organization
    //const org = await this.findOne(organizationId)
    const events = await this.findEvents(organizationId);

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }

    // Sort events by attendance count in descending order
    const sortedEvents = await Promise.all(
      events.map(async (event) => {
        const attendanceCount = await this.attendanceModel.countDocuments({ eventID: event?.ID }).exec();
        return { event, attendanceCount };
      }),
    );
    sortedEvents.sort((a, b) => b.attendanceCount - a.attendanceCount);

    // Return the top 3 most attended events
    const topAttendedEvents = sortedEvents.slice(0, 3).map((item) => item.event);

    return topAttendedEvents[0];
  }

  async getTop3EventCategories(organizationId: string): Promise<string[]> {
    // Find events for the specified organization
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    // Calculate the count of events for each category
    const categoryCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const category = event.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;}
    });
    console.log(categoryCounts);

    const sortedCategories = Object.keys(categoryCounts).sort(
      (a, b) => categoryCounts[b] - categoryCounts[a]
    );

    const topEventCategories = sortedCategories.slice(0, 3);

    return topEventCategories;
  }
}
