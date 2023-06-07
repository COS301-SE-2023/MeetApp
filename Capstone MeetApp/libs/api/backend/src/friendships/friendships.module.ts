import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from './schema';
import { User, UserSchema } from '../users/schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Friendship.name, schema: FriendshipSchema }]), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [FriendshipsController],
  providers: [FriendshipsService, UsersService]
})
export class FriendshipsModule {}
