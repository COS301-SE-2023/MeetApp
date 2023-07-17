import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':userID/friends')
  async getUserFriends(@Param('userID') userID: string) {
    const friends = await this.usersService.getUserFriends(userID);
    return friends;
  }

  @Get(':userId/attendances')
  getUserAttendances(@Param('userId') userId: string) {
    return this.usersService.getUserAttendances(userId);
  }

  @Get(':userId/friends/count')
  getUserFriendsCount(@Param('userId') userId: string) {
    return this.usersService.getUserFriendsCount(userId);
  }

  @Get(':userId/attendances/count')
  getUserAttendancesCount(@Param('userId') userId: string) {
    return this.usersService.getUserAttendancesCount(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get(':userID/friend-requests')
  async getUserFriendRequests(@Param('userID') userID: string) {
    const friends = await this.usersService.getUserFriendRequests(userID);
    return friends;
  }

  @Delete(':id/friend/unfriend')
  unfriend(@Param('id') id: string, @Body() friendID : {friend: string}) {
    return this.usersService.unfriend(id,friendID.friend);
  }

  @Post(':userID/friend/send-request')
  sendFriendRequest(@Param('userID') userID: string, @Body() requesteeID : {requestee: string}) {
    return this.usersService.sendFriendRequest(userID,requesteeID.requestee)
  }

  @Patch(':id/friend/accept-request')
  acceptFriendship(@Param('id') id: string, @Body() requesterID: {requester: string}) {
    return this.usersService.acceptRequest(id, requesterID.requester);
  }

  @Get(':userID/friend-requests/pending')
  async getUsersentRequests(@Param('userID') userID: string) {
    const friends = await this.usersService.getUserSentRequests(userID);
    return friends;
  }

  @Get(':id/friends/events')
  async getFriendEvents(@Param('id') userId: string) {
    return this.usersService.getFriendEvents(userId);
  }



  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
