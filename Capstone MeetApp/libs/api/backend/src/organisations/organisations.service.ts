import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
// import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Organisation } from './schema';
import { Model } from 'mongoose';
import { EventsService } from '../events/events.service';
import { JwtService } from '@nestjs/jwt';
import { Attendance } from '../attendances/schema';
import { Event } from '../events/schema';
import { User } from '../users/schema';
import { compare, hash } from 'bcrypt';


@Injectable()
export class OrganisationsService {
  constructor(@InjectModel(Organisation.name) private organisationModel: Model<Organisation>, private eventService :EventsService, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>, @InjectModel(Event.name) private eventModel: Model<Event>, @InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService){
    
  }
  async create(createOrgDto: CreateOrganisationDto) {
    const existingUser = await this.organisationModel.findOne({username : createOrgDto.username}).exec();
    if (existingUser)
      return {error: 409, message: "The username already exists"}
    const newOrg = await new this.organisationModel(createOrgDto);
    const orgSalt = this.getOrgSalt(newOrg.username, newOrg.password)
    const hashedPass = await hash(newOrg.password, orgSalt)
    newOrg.password = hashedPass

    const newOrgSaved = await newOrg.save()
    const payload = {id : (await newOrgSaved).id, username : (await newOrgSaved).username, password: (await newOrgSaved).password}
    return {access_token: await this.jwtService.signAsync(payload),message : 'Signup successful'}
  }
  async login(username: string, password: string) {
    const orgToLoginInto = await this.organisationModel.find({username : username}).exec()
    if (orgToLoginInto.length == 0){
      return {organisation: null, message: 'User not found'}
    }

    return await compare(password, orgToLoginInto[0].password).then(async result => {
      if (result){
        const payload = {id : orgToLoginInto[0].id, username : orgToLoginInto[0].username, password: orgToLoginInto[0].password}
        return {access_token: await this.jwtService.signAsync(payload),message : 'Login successful'}
      }
      else{
        return {organisation: username, message : 'Incorrect password'}
      }
        
    })
      
      
  }

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
      this.eventService.findOne(currentEventID)
    );
  
    const eventInfoArr = await Promise.all(eventPromises);
    //console.log(eventInfoArr);
    return eventInfoArr;
    }
    else
      return []
  }

  // update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
  //   NotImplementedException
  //   return `This action updates a #${id} organisation`;
  // }

  async remove(id: string) {
    const Org = await this.organisationModel.findOne({_id: id}).exec()
    const OrgEventsIDs = Org?.events.map( evt => evt.toString() )
    const OrgEvents = await this.eventModel.find({_id  : {$in: OrgEventsIDs}}).exec()
    const OrgEventsAtt = await this.attendanceModel.find({eventID  : {$in: OrgEventsIDs}}).exec()
    const payload =  {deleted_resources: {account : Org, events : OrgEvents, Attendances: OrgEventsAtt}}
    this.organisationModel.deleteOne({_id: id}).exec()
    this.eventModel.deleteMany({_id: {$in: OrgEventsIDs}}).exec()
    this.attendanceModel.deleteMany({eventID  : {$in: OrgEventsIDs}}).exec()
    return payload
    
  }

  async getTop3AttendedEvents(organizationId: string) {
    const events = await this.findEvents(organizationId);

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }

    const sortedEvents = await Promise.all(
      events.map(async (event) => {
        const attendanceCount = await this.attendanceModel.countDocuments({ eventID: event?._id }).exec();
        return { event, attendanceCount };
      }),
    );
    sortedEvents.sort((a, b) => b.attendanceCount - a.attendanceCount);

    const topAttendedEvents = sortedEvents.slice(0, 3).map((item) => new Object({event : item.event, count : item.attendanceCount}));

    return topAttendedEvents;
  }

  async getTopAttendedEvent(organizationId: string) {
    const events = await this.findEvents(organizationId);

    if (!events) {
      throw new NotFoundException('Organization not found.');
    }

    const sortedEvents = await Promise.all(
      events.map(async (event) => {
        const attendanceCount = await this.attendanceModel.countDocuments({ eventID: event?._id }).exec();
        return { event, attendanceCount };
      }),
    );
    sortedEvents.sort((a, b) => b.attendanceCount - a.attendanceCount);

    const topAttendedEvents = sortedEvents.slice(0, 3).map((item) => new Object({event : item.event, count : item.attendanceCount}));

    return topAttendedEvents[0];
  }

  async getTop3EventCategories(organizationId: string){
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

    const result: { category: string; count: number }[] = topEventCategories.map((category) => ({
      category,
      count: categoryCounts[category],
    }));

    return result;
  }

  async getTopEventCategory(organizationId: string){
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

    const result: { category: string; count: number }[] = topEventCategories.map((category) => ({
      category,
      count: categoryCounts[category],
    }));

    return result[0];
  }

  async getTopEventRegion(organizationId: string) {
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
    const result: { region: string; count: number }[] = topEventRegions.map((region) => ({
      region,
      count: regionCounts[region],
    }));

    return result[0];
  }

  async getTop3EventRegion(organizationId: string) {
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

    console.log(regionCounts)

    const sortedRegions = Object.keys(regionCounts).sort(
      (a, b) => regionCounts[b] - regionCounts[a]
    );

    console.log(sortedRegions)

    const topEventRegions = sortedRegions.slice(0, 3);

    const result: { region: string; count: number }[] = topEventRegions.map((region) => ({
      region,
      count: regionCounts[region],
    }));

    return result;
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

  async getTop3SupportersAndTheirTopEvents(organizationId: string): Promise<{ supporter: User, topEvent: Event | undefined | null}[]> {
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

    const topSupporters = await this.userModel
      .find({ _id: { $in: topSupporterIds } })
      .exec();

      const topSupportersAndTheirTopEvents: { supporter: User; topEvent: Event | undefined | null}[] = [];

      for (const supporter of topSupporters) {
        const topAttendance = await this.attendanceModel
          .findOne({ userID: supporter._id, organisationID: organizationId })
          .sort({ _id: -1 })
          .exec();
  
        let topEvent: Event | null | undefined;
        if (topAttendance) {
          topEvent = await this.eventModel.findById(topAttendance.eventID).exec();
        }
  
        topSupportersAndTheirTopEvents.push({ supporter, topEvent });
      }
  
      return topSupportersAndTheirTopEvents;
  }

  async getTopSupportersAndTheirTopEvents(organizationId: string): Promise<{ supporter: User, topEvent: Event | undefined | null}[]> {
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

    const topSupporterIds = sortedUsers.slice(0, 1);

    const topSupporters = await this.userModel
      .find({ _id: { $in: topSupporterIds } })
      .exec();

      const topSupportersAndTheirTopEvents: { supporter: User; topEvent: Event | undefined | null}[] = [];

      for (const supporter of topSupporters) {
        const topAttendance = await this.attendanceModel
          .findOne({ userID: supporter._id, organisationID: organizationId })
          .sort({ _id: -1 })
          .exec();
  
        let topEvent: Event | null | undefined;
        if (topAttendance) {
          topEvent = await this.eventModel.findById(topAttendance.eventID).exec();
        }
  
        topSupportersAndTheirTopEvents.push({ supporter, topEvent });
      }
  
      return topSupportersAndTheirTopEvents;
  }
  
  async getByUsername(user_name: string){
    return await this.organisationModel.findOne({username: user_name}).exec()
  }

  getAsciiSum(str : string) {
    let sum = 0;
  
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      sum += charCode;
    }
  
    return sum;
  }

  getOrgSalt(username : string, plainPass : string){
    return (this.getAsciiSum(username) * plainPass.length) % 8
  }

  async updateAllPasswords(){
    const allOrgs = await this.organisationModel.find().exec()
    const orgsUpdatedPasswords = allOrgs.map(async (org) => {
      const orgSalt = this.getOrgSalt(org.username, org.password)
      const hashedPass = await hash(org.password, orgSalt)
      const PassDto = {password : hashedPass}
      const updatedOrg = await this.organisationModel.findByIdAndUpdate(org._id, PassDto, {new : true})
      return {username: updatedOrg?.username, password : updatedOrg?.password}
    })
    return orgsUpdatedPasswords
  }

  /*async updateEmails() {
    try {
      const OrgToUpdate = await this.organisationModel.find({ emailAddress: { $exists: false } }).exec();

      
      for (const org of OrgToUpdate) {
        org.emailAddress = ""; 
        await org.save();
      }

      return { success: true, message: 'Organisations updated successfully.' };
    } catch (error) {
      return { success: false, message: 'Failed to update organisations.' };
    }
  }*/
}
