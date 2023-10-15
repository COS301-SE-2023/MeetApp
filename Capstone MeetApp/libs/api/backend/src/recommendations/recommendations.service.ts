import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './schema';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UsersService } from '../users/users.service';
import { Event } from '../events/schema';
import { RecommendationAlgorithm } from './recommendation.algorithm';
import { Attendance } from '../attendances/schema';
import {getWeightGroups } from './recommendations.initial-weights';
// import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class RecommendationsService {
  constructor(@InjectModel(Recommendation.name) private recommendationModel: Model<Recommendation>, private readonly userService: UsersService, @InjectModel(Event.name) private eventModel : Model<Event>, @InjectModel(Attendance.name) private attendanceModel : Model<Attendance>){
    
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

  async updateDocs(){
    
    try {
      // Find users without interests
      const WeightGroups = getWeightGroups()
      const weightGroupsArray = await Object.keys(WeightGroups).map((key) => ({
        key: key,
        value: WeightGroups[key]//.map((value) => {
        //   if (!value.value)
        //     value.value = 
        // }),
      }))
      //console.log(weightGroupsArray)
    //  const ActualWeights = Object.values(WeightGroups).reduce(
    //    (accumulator, currentValue) => accumulator.concat(currentValue),
    //    []
       
    //   );

      //const ActualWeights2 = ActualWeights.map
      //console.log(ActualWeights)
      const usersToUpdate = await this.userService.findAll()
      //console.log(`User count is ${usersToUpdate.length}`)

      // Update each user document with the interests field
      for (const user of usersToUpdate) {
        const randomIndex = Math.floor(Math.random() * 10);
        //console.log(`index is : ${randomIndex}`)
        const weights = await weightGroupsArray[randomIndex].value; // Get a random weight object
        //console.log(`weights are : ${weights}`)
        //console.log('beforeDTO')
        
        const recommendationdto : CreateRecommendationDto= {
          userID: user.id,
          weights: weights.map(weight => ({ parameter: weight.parameter, value: weight.value, rank : weight.rank })),
          rate: 0.001,
        }
        //console.log('AfterDTO')
        const recommendationToSave = new this.recommendationModel(recommendationdto);
      //console.log(recommendationToSave)
      await recommendationToSave.save();
      }

      return { success: true, message: 'Populated updated successfully.' };
    } catch (error) {
      console.error('Error in updateDocs:', error);
      return { success: false, message: 'Failed to update users.' };
    }
  }

    async getRecommendations(username : string){
      const user = await this.userService.getByUsername(username)
      if (user == null)
        return {message : 'User not found', payload : null}
      const userID = user._id.toString()
      const RecDoc = await this.recommendationModel.findOne({userID: userID}).exec()
      if (RecDoc == null)
        return {message : 'Weights not found', payload : null}
      const recRate = RecDoc.rate
      const recWeights = RecDoc.weights

      const topSupportedOrgs = await this.userService.getTopSupportedOrgs(userID)
      //this.userService.
      const userAttendancePre = await this.userService.getUserEvents(userID)
      const userAttendance = userAttendancePre.filter(cevent => {
         return cevent.attending
       })
      const userTopRegion = this.userService.recommendByRegion(userID)
      const userTopCategories = (await this.userService.recommendationCategory(userID))
      const otherEventsPlusAttendance = (await this.getEventAttendanceAll(userID)).map(obj => obj)
      //console.log(`Events attending: ${userAttendance}`)
      const userFriends = (await this.userService.getUserFriends(userID) )
      //console.log(`Friends: ${userFriends}`)
      if (userAttendance.length > 2 && userFriends.length > 2) {
        //console.log("Case1")
        const userFriendEvents = await this.userService.getFriendEvents(userID) as Event[]
        const recSystem = new RecommendationAlgorithm(userID,userFriends,userFriendEvents,user,recRate,recWeights,userAttendance,otherEventsPlusAttendance,userTopCategories,await userTopRegion,topSupportedOrgs)
        return recSystem.getRecommendations()
      }
      if (userAttendance.length <= 2 && userFriends.length > 2) {
        //console.log("Case2")
        const defaultUser = await this.userService.generateDefaultUser()
        const userFriendEvents = await this.userService.getFriendEvents(userID) as Event[]
        const recSystem = new RecommendationAlgorithm(userID,userFriends,userFriendEvents,defaultUser,recRate,recWeights,[],otherEventsPlusAttendance,userTopCategories,await userTopRegion,[])
        return recSystem.getRecommendations()
      }
      if (userAttendance.length > 2 && userFriends.length <= 2) {
        //console.log("Case3")
        const recSystem = new RecommendationAlgorithm(userID,[],[],user,recRate,recWeights,userAttendance,otherEventsPlusAttendance,userTopCategories,await userTopRegion,topSupportedOrgs)
        return recSystem.getRecommendations()
      }
      //console.log("Case4")
      const defaultUser = await this.userService.generateDefaultUser()
      const recSystem = new RecommendationAlgorithm(userID,[],[],defaultUser,recRate,recWeights,[],otherEventsPlusAttendance,userTopCategories,await userTopRegion,[])
      return recSystem.getRecommendations()
      
      
      
      

    }

    async getEventAttendanceAll(userID : string) {
    const eventAll = await this.eventModel.find({}).exec()
    const AttendancePlusCount = eventAll.map(async cevent => {
      const eventAttendanceCount = await this.attendanceModel.countDocuments({ eventID: cevent._id, userID : {$ne : userID}}); 
      return {event : cevent, attendees : eventAttendanceCount }
    })
    const resolvedEvents: {
      event: Event;
      attendees: number;
  }[] = await Promise.all(AttendancePlusCount.map(async (promise) => {
      const { event, attendees } = await promise;
      return { event, attendees };
  }));
    return resolvedEvents;
  }

  async updateDocsSingle(username : string){
    
    try {
      // Find users without interests
      const WeightGroups = getWeightGroups()
      const weightGroupsArray = await Object.keys(WeightGroups).map((key) => ({
        key: key,
        value: WeightGroups[key]
      }))



      const usersToUpdate = await this.userService.getByUsername(username)
      if (!usersToUpdate)
        return {message: "user not found", payload: null}
        const randomIndex = Math.floor(Math.random() * 10);
        const weights = await weightGroupsArray[randomIndex].value; 
        
        const recommendationdto : CreateRecommendationDto= {
          userID: usersToUpdate.id,
          weights: weights.map(weight => ({ parameter: weight.parameter, value: weight.value, rank : weight.rank })),
          rate: 0.001,
        
      }

      const recommendationToSave = new this.recommendationModel(recommendationdto);
      await recommendationToSave.save();

      return { success: true, message: 'Populated updated successfully.' };
    } catch (error) {
      console.error('Error in updateDocs:', error);
      return { success: false, message: 'Failed to update users.' };
    }
  }
  
}
