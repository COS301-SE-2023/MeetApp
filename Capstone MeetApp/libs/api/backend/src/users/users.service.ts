import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Attendance } from '../attendances/schema';
import { JwtService } from '@nestjs/jwt';
import { Event } from '../events/schema';
import { Friendship } from '../friendships/schema';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>, @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>, @InjectModel(Event.name) private eventModel: Model<Event>, private jwtService: JwtService){
    
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
}
