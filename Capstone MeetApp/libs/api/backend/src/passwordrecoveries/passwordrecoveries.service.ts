import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordRecovery } from './schema';
import { CreatePasswordRecoveryDto } from './dto/create-passwordrecovery.dto';

@Injectable()
export class PasswordRecoveriesService {
  constructor(@InjectModel(PasswordRecovery.name) private passwordRecoveryModel: Model<PasswordRecovery>){
    
  }
  async create(createPRDto: CreatePasswordRecoveryDto) {
    const newPR = await new this.passwordRecoveryModel(createPRDto);
    return newPR.save();
  }

  findAll() {
    return this.passwordRecoveryModel.find().exec();
  }

  findOne(id: string) {
    return this.passwordRecoveryModel.findById(id).exec();
  }

  // update(id: number, updatePRDto: UpdatePasswordRecoveryDto) {
  //   return `This action updates a #${id} password recovery`;
  // }

  async remove(id: string) {
    const deletedPR = await this.passwordRecoveryModel.findByIdAndDelete(id);
   if (!deletedPR) {
     throw new NotFoundException(`Password recovery #${id} not found`);
   }
   return deletedPR;
}
}
