import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, Request, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as RequestExpress } from 'express';
import { AuthGuard } from './users.guard';

interface AuthenticatedRequest extends Request {
  user: {id : string, username : string, password: string};
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  signup(@Body() LoginInfo : UpdateUserDto){
    if (LoginInfo != null){
      if (LoginInfo.password != null && LoginInfo.username != null)
        return this.usersService.login(LoginInfo.username,LoginInfo.password)
      else 
        return {user : null, message: "username or password missing"}
    }
    else
      return {user: null, message : "No payload found"}
  }


  @UseGuards(AuthGuard)
  @Get('account')
  getAccount(@Request() req : AuthenticatedRequest) {
      return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('attendances')
  getUserAttendancesJWT(@Request() req : AuthenticatedRequest) {
    //console.log(req.user)
    return this.usersService.getUserAttendances(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('attendances/count')
  getUserAttendancesCountJWT(@Request() req : AuthenticatedRequest) {
    return this.usersService.getUserAttendancesCount(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  updateJWT(@Request() req : AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }


  
  @Get()
  findAll(@Req() request: RequestExpress) {
    if (request.query == null)
      return this.usersService.findAll();
    else
      return this.usersService.findByQuery(request.query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   switch (id) {
  //     case 'friends':
  //       this.getUserFriends(re)
  //       break;
    
  //     default:
  //       break;
  //   }
  //   return this.usersService.findOne(id);
  // }

  @UseGuards(AuthGuard)
  @Get('friends')
  async getUserFriends(@Request() req : AuthenticatedRequest) {
    console.log("here")
    const friends = await this.usersService.getUserFriends(req.user.id);
    return friends;
  }


  @Get(':userId/attendances')
  getUserAttendances(@Param('userId') userId: string) {
    return this.usersService.getUserAttendances(userId);
  }

  @UseGuards(AuthGuard)
  @Get('friends/count')
  getUserFriendsCount(@Request() req : AuthenticatedRequest) {
    return this.usersService.getUserFriendsCount(req.user.id);
  }

  
  @Get(':userId/attendances/count')
  getUserAttendancesCount(@Param('userId') userId: string) {
    return this.usersService.getUserAttendancesCount(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('friend-requests')
  async getUserFriendRequests(@Request() req : AuthenticatedRequest) {
    const friends = await this.usersService.getUserFriendRequests(req.user.id);
    return friends;
  }

  @UseGuards(AuthGuard)
  @Delete('friend/unfriend')
  unfriend(@Request() req : AuthenticatedRequest, @Body() friendID : {friend: string}) {
    return this.usersService.unfriend(req.user.id,friendID.friend);
  }

  @UseGuards(AuthGuard)
  @Post('friend/send-request')
  sendFriendRequest(@Request() req : AuthenticatedRequest, @Body() requesteeID : {requestee: string}) {
    return this.usersService.sendFriendRequest(req.user.id,requesteeID.requestee)
  }

  @UseGuards(AuthGuard)
  @Patch('friend/accept-request')
  acceptFriendship(@Request() req : AuthenticatedRequest, @Body() requesterID: {requester: string}) {
    return this.usersService.acceptRequest(req.user.id, requesterID.requester);
  }

  @UseGuards(AuthGuard)
  @Get('friend-requests/pending')
  async getUsersentRequests(@Request() req : AuthenticatedRequest) {
    const friends = await this.usersService.getUserSentRequests(req.user.id);
    return friends;
  }

  @UseGuards(AuthGuard)
  @Get('friends/events')
  async getFriendEvents(@Request() req : AuthenticatedRequest) {
    return this.usersService.getFriendEvents(req.user.id);
  }



  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
