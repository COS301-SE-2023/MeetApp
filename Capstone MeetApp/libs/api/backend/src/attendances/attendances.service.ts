import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
// import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<Attendance>){
    
  }
  async create(createAttendanceDto: CreateAttendanceDto) {
    const newAttendance = await new this.attendanceModel(createAttendanceDto);
    return newAttendance.save();
  }

  findAll() {
    return this.attendanceModel.find().exec();
  }

  findOne(id: string) {
    return this.attendanceModel.findById(id).exec();
  }

  // update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
  //   return `This action updates a #${id} attendance`;
  // }

  async remove(id: string) {
    const deletedAttend = await this.attendanceModel.findByIdAndDelete(id);
   if (!deletedAttend) {
     throw new NotFoundException(`Attendance #${id} not found`);
   }
   return deletedAttend;
}
}
