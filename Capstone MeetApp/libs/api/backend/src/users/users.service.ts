import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema';
import { Model } from 'mongoose';
import { Attendance } from '../attendances/schema';
import { Friendship } from '../friendships/schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,  @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>){
    
  }
  
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return this.userModel.find().exec();
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
    return this.attendanceModel.find({ userID: userId }).exec();
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

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
