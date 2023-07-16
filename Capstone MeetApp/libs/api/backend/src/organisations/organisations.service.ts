import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateOrganisationDto } from './dto/create-organisation.dto';
// import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Organisation } from './schema';
import { Model } from 'mongoose';
import { EventsService } from '../events/events.service';
import { Attendance } from '../attendances/schema';
import { Event } from '../events/schema';
import { User } from '../users/schema';

@Injectable()
export class OrganisationsService {
  constructor(@InjectModel(Organisation.name) private organisationModel: Model<Organisation>, private eventService :EventsService, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>, @InjectModel(Event.name) private eventModel: Model<Event>, @InjectModel(User.name) private userModel: Model<User>){
    
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
    const events = await this.findEvents(organizationId);

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }

    const sortedEvents = await Promise.all(
      events.map(async (event) => {
        const attendanceCount = await this.attendanceModel.countDocuments({ eventID: event?.ID }).exec();
        return { event, attendanceCount };
      }),
    );
    sortedEvents.sort((a, b) => b.attendanceCount - a.attendanceCount);

    const topAttendedEvents = sortedEvents.slice(0, 3).map((item) => item.event);

    return topAttendedEvents;
  }

  async getTopAttendedEvent(organizationId: string) {
    const events = await this.findEvents(organizationId);

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }

    const sortedEvents = await Promise.all(
      events.map(async (event) => {
        const attendanceCount = await this.attendanceModel.countDocuments({ eventID: event?.ID }).exec();
        return { event, attendanceCount };
      }),
    );
    sortedEvents.sort((a, b) => b.attendanceCount - a.attendanceCount);

    const topAttendedEvents = sortedEvents.slice(0, 3).map((item) => item.event);

    return topAttendedEvents[0];
  }

  async getTop3EventCategories(organizationId: string): Promise<string[]> {
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    const categoryCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const category = event.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;}
    });

    const sortedCategories = Object.keys(categoryCounts).sort(
      (a, b) => categoryCounts[b] - categoryCounts[a]
    );

    const topEventCategories = sortedCategories.slice(0, 3);

    return topEventCategories;
  }

  async getTopEventCategory(organizationId: string): Promise<string> {
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    const categoryCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const category = event.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;}
    });

    const sortedCategories = Object.keys(categoryCounts).sort(
      (a, b) => categoryCounts[b] - categoryCounts[a]
    );

    const topEventCategories = sortedCategories.slice(0, 3);

    return topEventCategories[0];
  }

  async getTopEventRegion(organizationId: string): Promise<string> {
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    const regionCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const region = event.region;
      regionCounts[region] = (regionCounts[region] || 0) + 1;}
    });

    const sortedRegions = Object.keys(regionCounts).sort(
      (a, b) => regionCounts[b] - regionCounts[a]
    );

    const topEventRegions = sortedRegions.slice(0, 3);

    return topEventRegions[0];
  }

  async getTop3EventRegion(organizationId: string): Promise<string[]> {
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    const regionCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const region = event.region;
      regionCounts[region] = (regionCounts[region] || 0) + 1;}
    });

    const sortedRegions = Object.keys(regionCounts).sort(
      (a, b) => regionCounts[b] - regionCounts[a]
    );

    const topEventRegions = sortedRegions.slice(0, 3);

    return topEventRegions;
  }

  async getTop3Supporters(organizationId: string): Promise<{ username: string, region: string }[]> {
    const attendees = await this.attendanceModel
      .find({ organisationID: organizationId })
      .select('userID')
      .exec();

    if (!attendees) {
      throw new NotFoundException('Organization not found or no attendees.');
    }

    const userCounts: { [key: string]: number } = {};
    attendees.forEach((attendance) => {
      const userId = attendance.userID.toString();
      userCounts[userId] = (userCounts[userId] || 0) + 1;
    });

    const sortedUsers = Object.keys(userCounts).sort(
      (a, b) => userCounts[b] - userCounts[a]
    );

    const topSupporterIds = sortedUsers.slice(0, 3);
    const topSupporters = await this.userModel.find({ _id: { $in: topSupporterIds } }).select('username region -_id').exec();

    return topSupporters;
  }

  async getTopSupporter(organizationId: string): Promise<{ username: string, region: string }> {
    const attendees = await this.attendanceModel
      .find({ organisationID: organizationId })
      .select('userID')
      .exec();

    if (!attendees) {
      throw new NotFoundException('Organization not found or no attendees.');
    }

    const userCounts: { [key: string]: number } = {};
    attendees.forEach((attendance) => {
      const userId = attendance.userID.toString();
      userCounts[userId] = (userCounts[userId] || 0) + 1;
    });

    const sortedUsers = Object.keys(userCounts).sort(
      (a, b) => userCounts[b] - userCounts[a]
    );

    const topSupporterIds = sortedUsers.slice(0, 3);
    const topSupporters = await this.userModel.find({ _id: { $in: topSupporterIds } }).select('username region -_id').exec();

    return topSupporters[0];
  }

  async getCategoryCount(organizationId: string) {
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    const categoryCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const category = event.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;}
    });
    return categoryCounts;
  }

  async getRegionCount(organizationId: string) {
    const events = await this.findEvents(organizationId );

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }
    const regionCounts: { [key: string]: number } = {};
    events.forEach((event) => {
      if (event != null){
      const region = event.region;
      regionCounts[region] = (regionCounts[region] || 0) + 1;}
    });
    return regionCounts
  }
}
