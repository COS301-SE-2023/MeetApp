import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, Request, Delete, Headers, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as RequestExpress } from 'express';
import { AuthGuard } from './users.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  user: {id : string, username : string, password: string};
}

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  signup(@Body() LoginInfo : UpdateUserDto, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader)
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
  @ApiBearerAuth()
  getAccount(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
      return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('attendances')
  @ApiBearerAuth()
  getUserAttendancesJWT(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.usersService.getUserAttendances(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('attendances/count')
  @ApiBearerAuth()
  getUserAttendancesCountJWT(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.usersService.getUserAttendancesCount(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  @ApiBearerAuth()
  updateJWT(@Request() req : AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.usersService.update(req.user.id, updateUserDto);
  }


  
  @Get()
  findAll(@Req() request: RequestExpress, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    if (request.query == null)
      return this.usersService.findAll();
    else
      return this.usersService.findByQuery(request.query)
  }

  @UseGuards(AuthGuard)
  @Get('friends')
  @ApiBearerAuth()
  async getUserFriends(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    const friends = await this.usersService.getUserFriends(req.user.id);
    return friends;
  }

  @Get(':userId/attendances')
  getUserAttendances(@Param('userId') userId: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.usersService.getUserAttendances(userId);
  }

  @UseGuards(AuthGuard)
  @Get('friends/count')
  @ApiBearerAuth()
  getUserFriendsCount(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader)
    return this.usersService.getUserFriendsCount(req.user.id);
  }

  
  @Get(':userId/attendances/count')
  getUserAttendancesCount(@Param('userId') userId: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return this.usersService.getUserAttendancesCount(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('friend-requests')
  @ApiBearerAuth()
  async getUserFriendRequests(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    const friends = await this.usersService.getUserFriendRequests(req.user.id);
    return friends;
  }

  @UseGuards(AuthGuard)
  @Delete('friend/unfriend')
  @ApiBearerAuth()
  unfriend(@Request() req : AuthenticatedRequest, @Body() friendID : {friend: string}, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return this.usersService.unfriend(req.user.id,friendID.friend);
  }

  @UseGuards(AuthGuard)
  @Post('friend/send-request')
  @ApiBearerAuth()
  sendFriendRequest(@Request() req : AuthenticatedRequest, @Body() requesteeID : {requestee: string}, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return this.usersService.sendFriendRequest(req.user.id,requesteeID.requestee)
  }

  @UseGuards(AuthGuard)
  @Patch('friend/accept-request')
  @ApiBearerAuth()
  acceptFriendship(@Request() req : AuthenticatedRequest, @Body() requesterID: {requester: string}, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return this.usersService.acceptRequest(req.user.id, requesterID.requester);
  }

  @UseGuards(AuthGuard)
  @Get('friend-requests/pending')
  @ApiBearerAuth()
  async getUsersentRequests(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    const friends = await this.usersService.getUserSentRequests(req.user.id);
    return friends;
  }

  @UseGuards(AuthGuard)
  @Get('friends/events')
  @ApiBearerAuth()
  async getFriendEvents(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return this.usersService.getFriendEvents(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('attend')
  @ApiBearerAuth()
  async attendEvent(@Request() req : AuthenticatedRequest, @Body() eventToAttend : {eventID : string}, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(apiXHeader);
    return await this.usersService.attendEvent(req.user.id, eventToAttend.eventID);
  }

  @UseGuards(AuthGuard)
  @Get('all-events')
  @ApiBearerAuth()
  async getAllEvents(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.getUserEvents(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('event/:eventID')
  @ApiBearerAuth()
  async getEvent(@Request() req : AuthenticatedRequest, @Param('eventID') eventID :  string, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.getUserEvent(req.user.id, eventID)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/region')
  @ApiBearerAuth()
  async getRecRegion(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.recommendByRegion(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/category')
  @ApiBearerAuth()
  async getRecCategory(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.recommendationCategory(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/timeofday')
  @ApiBearerAuth()
  async getRecTOD(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.getUserTimeOfDayRecommendation(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('interests/category')
  @ApiBearerAuth()
  async getIntCategory(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.InterestCategory(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/duration')
  @ApiBearerAuth()
  async getRecDuration(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.getUserInterestAverageDuration(req.user.id)
  }
  
  // @UseGuards(AuthGuard)
  // @Get('interests/duration')
  // @ApiBearerAuth()
  // async getIntDuration(@Request() req : AuthenticatedRequest){
  //   return await this.usersService.getUserInterestDuration(req.user.id)
  // }

  @UseGuards(AuthGuard)
  @Get('interests/region')
  @ApiBearerAuth()
  async getIntRegion(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string){
    Logger.log(apiXHeader);
    return await this.usersService.InterestRegion(req.user.id)
  }
}
