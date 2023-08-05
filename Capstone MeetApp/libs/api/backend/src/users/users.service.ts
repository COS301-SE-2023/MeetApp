import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Attendance } from '../attendances/schema';
import { JwtService } from '@nestjs/jwt';
import { Organisation } from '../organisations/schema';
import { Event } from '../events/schema';
import { Friendship } from '../friendships/schema';

interface TimeOfDay {
  [key: string]: number;
}

// interface DurationFrequency {
//   interval: string;
//   frequency: number;
// }
@Injectable()

export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,  private jwtService: JwtService, @InjectModel(Event.name) private eventModel: Model<Event>, @InjectModel(Organisation.name) private orgModel: Model<Organisation>, @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>){
    
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

  async getUserFriends(userID: string) {
    const friendDocs = await this.friendshipModel.find({ $and: [{ $or: [{ requester: userID }, { requestee: userID }] }, { status: true }] }).exec();
    const friendsIDs : string[] = [];
    friendDocs.forEach(friendDoc => {
   
        friendsIDs.push(friendDoc.requestee.toString())
        friendsIDs.push(friendDoc.requester.toString())
    })
    const friendsIDsUnique = new Set(friendsIDs)
    friendsIDsUnique.delete(userID)
    const fndsArr = Array.from(friendsIDsUnique);

    const friends = await this.userModel
      .find({ _id: { $in: fndsArr } })
      .select('username ID')
      .exec();

    return friends;
  }

  async getUserAttendances(userId: string) {
    const attendanceslist = await this.attendanceModel.find({ userID: userId }).select('eventID -_id').exec();
    const Parsedattendanceslist = attendanceslist.map( (attendance) => {return attendance.eventID})
    return await this.eventModel.find({_id : {$in : Parsedattendanceslist}}).exec()
  }

  async getUserFriendsCount(userId: string) {
    return this.friendshipModel.countDocuments({ $and: [{ $or: [{ requester: userId }, { requestee: userId }] }, { status: true }] }).exec();
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

  async getUserSentRequests(userID: string) {
    const friendDocs = await this.friendshipModel.find({ requester: userID, status: false}).exec();
    const friendsIDs : string[] = []
    friendDocs.forEach(friendDoc => {
   
        friendsIDs.push(friendDoc.requestee.toString())
        friendsIDs.push(friendDoc.requester.toString())
    })
    const friendsIDsUnique = new Set(friendsIDs)
    friendsIDsUnique.delete(userID)
    const fndsArr = Array.from(friendsIDsUnique);

    const friends = await this.userModel
      .find({ _id: { $in: fndsArr } })
      .select('username ID')
      .exec();

    return friends;
  }

  async getUserFriendRequests(userID: string) {
    const friendDocs = await this.friendshipModel.find({ requestee: userID, status: false}).exec();
    const friendsIDs : string[]= []
    friendDocs.forEach(friendDoc => {
   
        friendsIDs.push(friendDoc.requestee.toString())
        friendsIDs.push(friendDoc.requester.toString())
    })
    const friendsIDsUnique = new Set(friendsIDs)
    friendsIDsUnique.delete(userID)
    const fndsArr = Array.from(friendsIDsUnique);

    const friends = await this.userModel
      .find({ _id: { $in: fndsArr } })
      .select('username ID')
      .exec();

    return friends;
  }

  async sendFriendRequest(requester: string, requestee: string){
    const newFriendship = await new this.friendshipModel({requester: requester, requestee: requestee, status: false});
    return newFriendship.save();
  }

  async acceptRequest(reequesteeID: string, requesterID : string) {
    const existingFriendship = await this.friendshipModel.find({requestee: reequesteeID, requester: requesterID}).exec()
    if (!existingFriendship[0]) {
      throw new NotFoundException(`Friend request not found`);
    }
    else {
      if (existingFriendship[0].status == true)
        return {friendship: existingFriendship[0], message: "Already Friends", changes : false}
      else
      {
        const statusUpdate = await this.friendshipModel.findByIdAndUpdate(existingFriendship[0]._id, {status : true}, { new: true });
        if (statusUpdate)
          return {friendship: statusUpdate, message: "Friend added successfully!", changes : statusUpdate.status};
        else 
          return {friendship: existingFriendship[0], message: "Error adding friend!", changes : false};
      }
    }
  }

  async unfriend(userID: string, friendID : string) {
    const existingFriendship = await this.friendshipModel.find({ $and: [{ $or: [{ requester: userID }, { requestee: userID }] }, { status: true }] }).exec();
    if (!existingFriendship[0]) {
      throw new NotFoundException(`User has no friends`);
    }
    const friendshipToDeleteArr = await this.friendshipModel.find({id: "000000000000000000000000"}).exec()
    await existingFriendship.forEach(async friendship => {
      if (friendship.requestee.toString() == friendID || friendship.requester.toString() == friendID)
      {
        friendshipToDeleteArr.push(friendship)
      }})
      if (!friendshipToDeleteArr[0]) {
        throw new NotFoundException(`Friendship does not exist`);
      }
      else 
      {
        const deletedFriendship = await this.friendshipModel.findByIdAndDelete(friendshipToDeleteArr[0]._id);
        if (deletedFriendship == null)
            {
              
            return {friendship: null, message: "Error removing friendship!", changes : false}
            }
        else{
          
          return {friendship: deletedFriendship, message: "Friend removed successfully!", changes : true}
        }
      }

        
        
      
  }

  async getFriendEvents(userId: string): Promise<Event[] | ObjectId[]> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const friendships = await this.friendshipModel
      .find({ $or: [{ requester: userId }, { requestee: userId }], status: true })
      .exec();

    const friendIds = friendships.map((friendship) =>
      friendship.requester.toString() == userId ? friendship.requestee : friendship.requester
    );

    const friendEvents = await this.attendanceModel
      .find({ userID: { $in: friendIds } })
      .populate('eventID')
      .exec();

    const events = friendEvents.map((attendance) => attendance.eventID);
    const eventsDetails = await this.eventModel.find({ _id: {$in: events}})
    return eventsDetails;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async attendEvent(userId: string, eventId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const eventToCheck = await this.eventModel.findById(eventId);
    if (!eventToCheck) {
      throw new NotFoundException('Event not found');
    }

    const existingAttendance = await this.attendanceModel.findOne({
      userID: userId,
      eventID: eventId,
    }).exec();

    if (existingAttendance) {
      return {message : 'User already attending', payload : existingAttendance, changes : false}
    }

    const organization = await this.orgModel.findOne({ name:  eventToCheck.organisation}).exec();

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const newAttendance = new this.attendanceModel({
      userID: userId,
      eventID: eventId,
      organisationID: organization._id,
    });

    return {message : "Attendance Added",  payload : await newAttendance.save(), changes : true};
  }

  async getUserEvents(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const events = await this.eventModel.find();

    const eventsWithAttending = events.map(async (event) => {
      const isAttending = await this.attendanceModel.exists({
        userID: userId,
        eventID: event._id,
      });
      const isAttendBool = isAttending ? true : false;

      return {
        ...event.toObject(),
        attending: isAttendBool,
      };
    });

    return Promise.all(eventsWithAttending);
  }

  async getUserEvent(userId: string, eventId: string){
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

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

  async recommendByRegion(userId: string){
    const currentUser = await this.userModel.findById(userId).exec();
    return await this.eventModel.find({region: currentUser?.region})
  }

  async InterestCategory(userId: string){
    const attendances = await this.attendanceModel.find({userID: userId}).exec()
    const eventsIDArr = attendances.map((attendance) => {return attendance.eventID})
    const eventsDetailsArr = await this.eventModel.find({_id : {$in: eventsIDArr}}).exec()
    const categoryCount: { [key: string]: number } = {};
    eventsDetailsArr.forEach((event) => {
      if (event != null){
      const category = event.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;}
    });
    return categoryCount
  }

  async InterestRegion(userId: string){
    const attendances = await this.attendanceModel.find({userID: userId}).exec()
    const eventsIDArr = attendances.map((attendance) => {return attendance.eventID})
    const eventsDetailsArr = await this.eventModel.find({_id : {$in: eventsIDArr}}).exec()
    const regionCount: { [key: string]: number } = {};
    eventsDetailsArr.forEach((event) => {
      if (event != null){
      const region = event.region;
      regionCount[region] = (regionCount[region] || 0) + 1;}
    });
    return regionCount
  }

  async recommendationCategory(userId: string){
    const attendances = await this.attendanceModel.find({userID: userId}).exec()
    const eventsIDArr = attendances.map((attendance) => {return attendance.eventID})
    const eventsDetailsArr = await this.eventModel.find({_id : {$in: eventsIDArr}}).exec()
    const categoryCount: { [key: string]: number } = {};
    eventsDetailsArr.forEach((event) => {
      if (event != null){
      const category = event.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;}
    });
    const sortCat = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[b] - categoryCount[a]
    );
    return await this.eventModel.find({category: sortCat[0]})
  }

  async getUserTimeOfDayRecommendation(userId: string){

    
    // Check if the user exists in the database
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find attended events for the user
    const attendances = await this.attendanceModel.find({userID: userId}).exec()
    const eventsIDArr = attendances.map((attendance) => {return attendance.eventID})
    const attendedEvents = await this.eventModel.find({_id : {$in: eventsIDArr}}).exec()

    // Get the frequency of each time of day
    const timeOfDayFrequency: TimeOfDay = {
      morning: 0,
      afternoon: 0,
      evening: 0,
      night: 0,
    };

    attendedEvents.forEach((event) => {
      const startTime = parseInt(event.startTime.split(':')[0], 10);
      if (startTime >= 0 && startTime < 6) {
        timeOfDayFrequency['night']++;
      } else if (startTime >= 6 && startTime < 12) {
        timeOfDayFrequency['morning']++;
      } else if (startTime >= 12 && startTime < 18) {
        timeOfDayFrequency['afternoon']++;
      } else {
        timeOfDayFrequency['evening']++;
      }
    });

    console.log(timeOfDayFrequency)

    // Find the most frequent time of day
    const mostFrequentTimeOfDay = Object.keys(timeOfDayFrequency).reduce((a, b) =>
      timeOfDayFrequency[a] > timeOfDayFrequency[b] ? a : b
    );

    // Filter events falling under the most frequent time of day
    const eventsForRecommendation = attendedEvents.filter((event) => {
      const startTime = parseInt(event.startTime.split(':')[0], 10);
      if (mostFrequentTimeOfDay === 'morning' && startTime >= 6 && startTime < 12) {
        return true;
      } else if (mostFrequentTimeOfDay === 'afternoon' && startTime >= 12 && startTime < 18) {
        return true;
      } else if (mostFrequentTimeOfDay === 'evening' && startTime >= 18) {
        return true;
      } else if (mostFrequentTimeOfDay === 'night' && (startTime >= 0 && startTime < 6)) {
        return true;
      }
      return false;
    });

    return eventsForRecommendation;
  }

  async getUserInterestAverageDuration(userId: string){

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    
    const attendances = await this.attendanceModel.find({userID: userId}).exec()
    const eventsIDArr = attendances.map((attendance) => {return attendance.eventID})
    const attendedEvents = await this.eventModel.find({_id : {$in: eventsIDArr}}).exec()

    const totalDurationInMinutes = attendedEvents.reduce((total, event) => {
      const [startHour, startMinute] = event.startTime.split(':').map(Number);
      const [endHour, endMinute] = event.endTime.split(':').map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      console.log(startTimeInMinutes, endTimeInMinutes)

      return total + (endTimeInMinutes - startTimeInMinutes);
    }, 0);
    const averageDurationInMinutes = Math.round(totalDurationInMinutes / attendedEvents.length);

    // Find events falling 30 minutes above and 30 minutes below the average duration
    const eventIntervals: Event[] = attendedEvents.filter((event) => {
      const [startHour, startMinute] = event.startTime.split(':').map(Number);
      const [endHour, endMinute] = event.endTime.split(':').map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
      return durationInMinutes >= averageDurationInMinutes - 30 && durationInMinutes <= averageDurationInMinutes + 30;
    });

    return eventIntervals;
  }

  // async getUserInterestDuration(userId: string) {
  //   // Check if the user exists in the database
  //   const user = await this.userModel.findById(userId);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // Find attended events for the user
  //   const attendances = await this.attendanceModel.find({userID: userId}).exec()
  //   const eventsIDArr = attendances.map((attendance) => {return attendance.eventID})
  //   const attendedEvents = await this.eventModel.find({_id : {$in: eventsIDArr}}).exec()

  //   // Calculate duration frequencies for each interval
  //   const durationFrequencies: DurationFrequency[] = [];
  //   const intervals: number[] = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300]; // Minutes

  //   attendedEvents.forEach((event) => {
  //     const startTime = new Date(event.startTime);
  //     const endTime = new Date(event.endTime);
  //     const durationInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

  //     // Find the appropriate interval for the event duration
  //     let interval = '30m';
  //     for (const i of intervals) {
  //       if (durationInMinutes <= i) {
  //         interval = `${i}m`;
  //         break;
  //       }
  //     }

  //     // Check if the interval already exists in the durationFrequencies array
  //     const existingFrequency = durationFrequencies.find((df) => df.interval === interval);

  //     if (existingFrequency) {
  //       existingFrequency.frequency++;
  //     } else {
  //       durationFrequencies.push({ interval, frequency: 1 });
  //     }
  //   });

  //   // Convert durationFrequencies array to the desired format
  //   const formattedDurationFrequencies: unknown[] = durationFrequencies.map((df) => ({
  //     interval: df.interval.includes('h') ? df.interval : `${df.interval}m`,
  //     frequency: df.frequency,
  //   }));

  //   return formattedDurationFrequencies;
  // }
}
