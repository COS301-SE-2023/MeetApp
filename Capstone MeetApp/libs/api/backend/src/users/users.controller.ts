import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, Request } from '@nestjs/common';
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  @Get(':userId/attendances')
  getUserAttendances(@Param('userId') userId: string) {
    return this.usersService.getUserAttendances(userId);
  }

  @Get(':userId/attendances/count')
  getUserAttendancesCount(@Param('userId') userId: string) {
    return this.usersService.getUserAttendancesCount(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  @UseGuards(AuthGuard)
  @Post('attend')
  async attendEvent(@Request() req : AuthenticatedRequest, @Body() eventToAttend : {eventID : string}) {
    return await this.usersService.attendEvent(req.user.id, eventToAttend.eventID);

  }

  @UseGuards(AuthGuard)
  @Get('all-events')
  async getAllEvents(@Request() req : AuthenticatedRequest){
    return await this.usersService.getUserEvents(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('event/:eventID')
  async getEvent(@Request() req : AuthenticatedRequest, @Param('eventID') eventID :  string){
    return await this.usersService.getUserEvent(req.user.id, eventID)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/region')
  async getRecRegion(@Request() req : AuthenticatedRequest){
    return await this.usersService.recommendByRegion(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('recommendations/category')
  async getRecCategory(@Request() req : AuthenticatedRequest){
    return await this.usersService.recommendationCategory(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('interests/category')
  async getIntCategory(@Request() req : AuthenticatedRequest){
    return await this.usersService.InterestCategory(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('interests/region')
  async getIntRegion(@Request() req : AuthenticatedRequest){
    return await this.usersService.InterestRegion(req.user.id)
  }
}
