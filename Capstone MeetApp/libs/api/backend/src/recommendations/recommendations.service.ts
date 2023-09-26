import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './schema';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
// import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class RecommendationsService {
  constructor(@InjectModel(Recommendation.name) private recommendationModel: Model<Recommendation>){
    
  }
  async create(createRecommendationDto: CreateRecommendationDto) {
    const newRecommendation = await new this.recommendationModel(createRecommendationDto);
    return newRecommendation.save();
  }

  findAll() {
    return this.recommendationModel.find().exec();
  }

  findOne(id: string) {
    return this.recommendationModel.findById(id).exec();
  }

  // update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
  //   return `This action updates a #${id} recommendation`;
  // }

  async remove(id: string) {
    const deletedRecommend = await this.recommendationModel.findByIdAndDelete(id);
   if (!deletedRecommend) {
     throw new NotFoundException(`Recommendation #${id} not found`);
   }
   return deletedRecommend;
}
}
