import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

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
}
