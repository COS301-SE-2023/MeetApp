import { Controller, Get, Param, Req } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
// import { CreateFriendshipDto } from './dto/create-friendship.dto';
// import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Request } from 'express';

@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  // @Post()
  // create(@Body() createFriendshipDto: CreateFriendshipDto) {
  //   return this.friendshipsService.create(createFriendshipDto);
  // }

  @Get()
  findAll(@Req() request: Request) {
    //console.log('wrong endpoint')
    if (request.query == null)
      return this.friendshipsService.findAll();
    else
      return this.friendshipsService.findByQuery(request.query)
      
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendshipsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFriendshipDto: UpdateFriendshipDto) {
  //   return this.friendshipsService.update(+id, updateFriendshipDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendshipsService.remove(+id);
  // }
}
