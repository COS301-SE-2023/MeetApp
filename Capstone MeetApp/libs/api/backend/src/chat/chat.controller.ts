import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat') 
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':roomId/messages') 
  async getRoomMessages(@Param('roomId') roomId: string) {
    const messages = await this.chatService.getRoomMessages(roomId);
    
    return { messages };
  }

  @Get(':roomId') 
  async getRoomM(@Param('roomId') roomId: string) {
    const room = await this.chatService.getRoom(roomId);
    
    return room;
  }

  @Get(':roomId/:userId/banned') 
  async getBannedCheck(@Param('roomId') roomId: string, @Param('userId') userId: string) {
    const check = await this.chatService.checkBanned(userId,roomId);
    
    return check;
  }

  @Get(':roomId/:userId/creator') 
  async getOwnerCheck(@Param('roomId') roomId: string, @Param('userId') userId: string) {
    const check = await this.chatService.checkCreator(userId, roomId);
    
    return check;
  }

  @Get(':roomId/creator') 
  async getOwner(@Param('roomId') roomId: string) {
    const creator = await this.chatService.getCreator(roomId);
    
    return creator;
  }

  @Post()
  async saveRoom(@Body() roomInfo: CreateChatDto){
    return await this.chatService.saveMessages(roomInfo)
  }

  
}
