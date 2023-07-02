import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema';
import { Model } from 'mongoose';
import { Attendance } from '../attendances/schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>){
    
  }
  
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  async login(username: string, password: string) {
    const userToLoginInto = await this.userModel.find({username : username}).exec()
    if (userToLoginInto.length == 0){
      return {user: null, message: 'User not found'}
    }
    else {
      if (userToLoginInto[0].password == password){
        return {user: userToLoginInto[0], message : 'Login successful'}
      }
      else{
        return {user: username, message : 'Incorrect password'}
      }
    }
  }

  findAll() {
    return this.userModel.find().exec();
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
}
