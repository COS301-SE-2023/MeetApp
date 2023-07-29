import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema';
import { FilterQuery, Model } from 'mongoose';
import { Attendance } from '../attendances/schema';
import { JwtService } from '@nestjs/jwt';
import { Organisation } from '../organisations/schema';
import { Event } from '../events/schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,  private jwtService: JwtService, @InjectModel(Event.name) private eventModel: Model<Event>, @InjectModel(Organisation.name) private orgModel: Model<Organisation>){
    
  }
  
  async create(createUserDto: CreateUserDto) {
    const newUser = await new this.userModel(createUserDto);
    const newUserSaved = newUser.save()
    const payload = {id : (await newUserSaved).id, username : (await newUserSaved).username, password: (await newUserSaved).password}
    return {access_token: await this.jwtService.signAsync(payload),message : 'Signup successful'}
  }
  async login(username: string, password: string) {
    const userToLoginInto = await this.userModel.find({username : username}).exec()
    if (userToLoginInto.length == 0){
      return {user: null, message: 'User not found'}
    }
    else {
      if (userToLoginInto[0].password == password){
        const payload = {id : userToLoginInto[0].id, username : userToLoginInto[0].username, password: userToLoginInto[0].password}
        return {access_token: await this.jwtService.signAsync(payload),message : 'Login successful'}
      }
      else{
        return {user: username, message : 'Incorrect password'}
      }
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findByQuery(queryIN : FilterQuery<Event>) {
    return this.userModel.find(queryIN).exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async getUserAttendances(userId: string) {
    return this.attendanceModel.find({ userID: userId }).exec();
  }

  async getUserAttendancesCount(userId: string) {
    return this.attendanceModel.countDocuments({ userID: userId }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
   if (!existingUser) {
     throw new NotFoundException(`User #${id} not found`);
   }
   return existingUser;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async attendEvent(userId: string, eventId: string) {
    // Check if the user exists in the database
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the event exists in the database
    const eventToCheck = await this.eventModel.findById(eventId);
    if (!eventToCheck) {
      throw new NotFoundException('Event not found');
    }

    // Check if the user has already attended the event
    const existingAttendance = await this.attendanceModel.findOne({
      userID: userId,
      eventID: eventId,
    }).exec();

    if (existingAttendance) {
      return {message : 'User already attending', payload : existingAttendance, changes : false}
    }

    // Fetch the organization ID based on the organization name
    const organization = await this.orgModel.findOne({ name:  eventToCheck.organisation}).exec();

    // If the organization doesn't exist, throw an error or handle it as needed
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    // If user has not attended the event, add attendance to the database
    const newAttendance = new this.attendanceModel({
      userID: userId,
      eventID: eventId,
      organisationID: organization._id,
    });

    return {message : "Attendance Added",  payload : await newAttendance.save(), changes : true};
  }

  async getUserEvents(userId: string) {
    // Check if the user exists in the database
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Fetch all events
    const events = await this.eventModel.find();

    // Iterate through the events and check if the user is attending each event
    const eventsWithAttending = events.map(async (event) => {
      // Check if the user has attended the event
      const isAttending = await this.attendanceModel.exists({
        userID: userId,
        eventID: event._id,
      });
      const isAttendBool = isAttending ? true : false;

      // Create a new object with the event details and the attending field
      return {
        ...event.toObject(),
        attending: isAttendBool,
      };
    });

    // Wait for all the promises to resolve and return the events with the attending field
    return Promise.all(eventsWithAttending);
  }

  async getUserEvent(userId: string, eventId: string){
    // Check if the user exists in the database
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Fetch all events
    const eventNow = await this.eventModel.findById(eventId).exec();

    if (!eventNow)
      return null;
    else {
      const isAttending = await this.attendanceModel.exists({
        userID: userId,
        eventID: eventNow._id,})

      const isAttendBool = isAttending ? true : false;
      return {
        ...eventNow.toObject(),
        attending: isAttendBool,
      };
    }
  }
}
