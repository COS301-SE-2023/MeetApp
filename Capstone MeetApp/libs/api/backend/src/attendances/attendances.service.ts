import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './schema';
// import { CreateAttendanceDto } from './dto/create-attendance.dto';
// import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<Attendance>){
    
  }
  // create(createAttendanceDto: CreateAttendanceDto) {
  //   return 'This action adds a new attendance';
  // }

  findAll() {
    return this.attendanceModel.find().exec();
  }

  findOne(id: string) {
    return this.attendanceModel.findById(id).exec();
  }

  // update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
  //   return `This action updates a #${id} attendance`;
  // }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
