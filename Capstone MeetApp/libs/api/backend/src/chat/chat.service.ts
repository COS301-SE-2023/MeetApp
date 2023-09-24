import { Injectable } from '@nestjs/common';
import { Chat } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  
  async getRoomMessages(roomId: string){
    
    const roomDoc = await this.chatModel.findOne({roomID : roomId}).exec()
    if (!roomDoc) return {message: "Chat room does not exist"}
    return roomDoc?.messages;
  }

  async getRoom(roomId: string){
    
    const roomDoc = await this.chatModel.findOne({roomID : roomId}).exec()
    if (!roomDoc) return {message: "Chat room does not exist"}
    return roomDoc;
  }

  async getCreator(roomId: string){
    
    const roomDoc = await this.chatModel.findOne({roomID : roomId}).exec()
    if (!roomDoc) return {message: "Chat room does not exist"}
    return roomDoc.organisationID;
  }

  // Example: Save chat room history
  async saveMessages(chatRoomDetails : CreateChatDto){
    const newChatRoom = await new this.chatModel(chatRoomDetails)
    
    return newChatRoom.save();
  }

  async checkBanned(userId : string, roomId : string){
    const roomDoc = await this.chatModel.findOne({roomID : roomId}).exec()
    if (!roomDoc) return {message: "Room does not exist"}
    if (roomDoc.bannedUsers.find(userId => userId))
      return true
    else 
      return false
  }

  async checkCreator(userId : string, roomId : string){
    const roomDoc = await this.chatModel.findOne({roomID : roomId}).exec()
    if (!roomDoc) return {message: "Room does not exist"}
    if (roomDoc.organisationID.toString() == userId)
      return true
    else 
      return false
  }

}
