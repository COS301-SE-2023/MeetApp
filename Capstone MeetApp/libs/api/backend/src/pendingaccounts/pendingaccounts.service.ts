import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PendingAccount } from './schema';
import { CreatePendingAccountDto } from './dto/create-pendingaccount.dto';

@Injectable()
export class PendingAccountsService {
  constructor(@InjectModel(PendingAccount.name) private pendingAccountModel: Model<PendingAccount>){
    
  }
  async create(createAttendanceDto: CreatePendingAccountDto) {
    const newPA = await new this.pendingAccountModel(createAttendanceDto);
    return newPA.save();
  }

  findAll() {
    return this.pendingAccountModel.find().exec();
  }

  findOne(id: string) {
    return this.pendingAccountModel.findById(id).exec();
  }

  // update(id: number, updatePendingAccountDto: UpdatePendingAccountDto) {
  //   return `This action updates a #${id} pending account`;
  // }

  async remove(id: string) {
    const deletedPA = await this.pendingAccountModel.findByIdAndDelete(id);
   if (!deletedPA) {
     throw new NotFoundException(`Pending account #${id} not found`);
   }
   return deletedPA;
}
}
