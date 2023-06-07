import { Injectable } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Friendship } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/schema';

@Injectable()
export class FriendshipsService {
  constructor(@InjectModel(Friendship.name) private friendshipModel: Model<Friendship>, private userService :UsersService){
    
  }

  create(createFriendshipDto: CreateFriendshipDto) {
    return 'This action adds a new friendship';
  }

  async findAll() {
    const friendDoc = await this.friendshipModel.find().exec();
    const res: unknown[] = [];
    const friendPromises = friendDoc.map(async (currentFriendship) => {
      const currentFriendshipRequestee = (await this.userService.findOne(currentFriendship.requestee))?.toObject()
      //console.log(currentFriendship.requestee)
      const currentFriendshipRequester = (await this.userService.findOne(currentFriendship.requester))?.toObject()
      const currentFriendshipStatus = currentFriendship.status
      res.push({requester :currentFriendshipRequester, requestee : currentFriendshipRequestee, status : currentFriendshipStatus})
  })
  const friendshipRes = await Promise.all(friendPromises);
  console.log(friendshipRes);

  return res;
  }

  findByQuery(queryIN : FilterQuery<Event>) {
    return this.friendshipModel.find(queryIN).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} friendship`;
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendship`;
  }
}
