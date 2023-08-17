import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, Request, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as RequestExpress } from 'express';
import { AuthGuard } from './users.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags, ApiBearerAuth, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { AuthenticatedRequest, AuthenticatedRequestClass, UserLoginRequest} from '../interfaces';
import { CreateEventDto } from '../events/dto/create-event.dto';
import { User } from './schema';


@Controller('users')
@ApiSecurity('Api-Key')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({summary: 'Create a new user'})
  @ApiBody({description: 'Fill in your information', type: CreateUserDto})
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({summary: 'Log into an existing account'})
  @ApiBody({description: 'Fill in your the account\'s credentials', type: UserLoginRequest})
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
  @ApiBearerAuth()
  @ApiResponse({type: AuthenticatedRequestClass, description: "The user's credentials"})
  getAccount(@Request() req : AuthenticatedRequest) {
    //
      return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('attendances')
  @ApiBearerAuth()
  @ApiResponse({type: [CreateEventDto], description: "A list of events attended by the user"})
  getUserAttendancesJWT(@Request() req : AuthenticatedRequest, ) {
    
    return this.usersService.getUserAttendances(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('attendances/count')
  @ApiBearerAuth()
  @ApiResponse({type: Number, description: "The total number of events attended by the user"})
  getUserAttendancesCountJWT(@Request() req : AuthenticatedRequest, ) {
    
    return this.usersService.getUserAttendancesCount(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  @ApiBearerAuth()
  updateJWT(@Request() req : AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto, ) {
    
    return this.usersService.update(req.user.id, updateUserDto);
  }


  
  @Get()
  @ApiResponse({type: [User], description: "A list of all existing users"})
  findAll(@Req() request: RequestExpress, ) {
    
    if (request.query == null)
      return this.usersService.findAll();
    else
      return this.usersService.findByQuery(request.query)
  }

  @UseGuards(AuthGuard)
  @Get('friends')
  @ApiBearerAuth()
  async getUserFriends(@Request() req : AuthenticatedRequest, ) {
    
    const friends = await this.usersService.getUserFriends(req.user.id);
    return friends;
  }

  @Get(':userId/attendances')
  getUserAttendances(@Param('userId') userId: string, ) {
    
    return this.usersService.getUserAttendances(userId);
  }

  @UseGuards(AuthGuard)
  @Get('friends/count')
  @ApiBearerAuth()
  getUserFriendsCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.usersService.getUserFriendsCount(req.user.id);
  }

  
  @Get(':userId/attendances/count')
  getUserAttendancesCount(@Param('userId') userId: string, ) {
    
    return this.usersService.getUserAttendancesCount(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, ) {
    
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('friend-requests')
  @ApiBearerAuth()
  async getUserFriendRequests(@Request() req : AuthenticatedRequest, ) {
    
    const friends = await this.usersService.getUserFriendRequests(req.user.id);
    return friends;
  }

  @UseGuards(AuthGuard)
  @Delete('friend/unfriend')
  @ApiBearerAuth()
  unfriend(@Request() req : AuthenticatedRequest, @Body() friendID : {friend: string}, ) {
    
    return this.usersService.unfriend(req.user.id,friendID.friend);
  }

  @UseGuards(AuthGuard)
  @Post('friend/send-request')
  @ApiBearerAuth()
  sendFriendRequest(@Request() req : AuthenticatedRequest, @Body() requesteeID : {requestee: string}, ) {
    
    return this.usersService.sendFriendRequest(req.user.id,requesteeID.requestee)
  }

  @UseGuards(AuthGuard)
  @Patch('friend/accept-request')
  @ApiBearerAuth()
  acceptFriendship(@Request() req : AuthenticatedRequest, @Body() requesterID: {requester: string}, ) {
    
    return this.usersService.acceptRequest(req.user.id, requesterID.requester);
  }

  @UseGuards(AuthGuard)
  @Get('friend-requests/pending')
  @ApiBearerAuth()
  async getUsersentRequests(@Request() req : AuthenticatedRequest, ) {
    
    const friends = await this.usersService.getUserSentRequests(req.user.id);
    return friends;
  }

  @UseGuards(AuthGuard)
  @Get('friends/events')
  @ApiBearerAuth()
  async getFriendEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.usersService.getFriendEvents(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('attend')
  @ApiBearerAuth()
  async attendEvent(@Request() req : AuthenticatedRequest, @Body() eventToAttend : {eventID : string}, ) {
    
    return await this.usersService.attendEvent(req.user.id, eventToAttend.eventID);
  }

  @UseGuards(AuthGuard)
  @Get('all-events')
  @ApiBearerAuth()
  async getAllEvents(@Request() req : AuthenticatedRequest, ){
    
    return await this.usersService.getUserEvents(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('event/:eventID')
  @ApiBearerAuth()
  async getEvent(@Request() req : AuthenticatedRequest, @Param('eventID') eventID :  string, ){
    
    return await this.usersService.getUserEvent(req.user.id, eventID)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/region')
  @ApiBearerAuth()
  async getRecRegion(@Request() req : AuthenticatedRequest, ){
    
    return await this.usersService.recommendByRegion(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/category')
  @ApiBearerAuth()
  async getRecCategory(@Request() req : AuthenticatedRequest, ){
    
    return await this.usersService.recommendationCategory(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/timeofday')
  @ApiBearerAuth()
  async getRecTOD(@Request() req : AuthenticatedRequest, ){
    
    return await this.usersService.getUserTimeOfDayRecommendation(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('interests/category')
  @ApiBearerAuth()
  async getIntCategory(@Request() req : AuthenticatedRequest, ){
    
    return await this.usersService.InterestCategory(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/duration')
  @ApiBearerAuth()
  async getRecDuration(@Request() req : AuthenticatedRequest, ){
    
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
  async getIntRegion(@Request() req : AuthenticatedRequest, ){
    
    return await this.usersService.InterestRegion(req.user.id)
  }
}
