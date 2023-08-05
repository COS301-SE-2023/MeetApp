import { Controller, Get, Param, Req } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
// import { CreateFriendshipDto } from './dto/create-friendship.dto';
// import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('friendships')
@ApiTags('Friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  // @Post()
  // create(@Body() createFriendshipDto: CreateFriendshipDto) {
  //   return this.friendshipsService.create(createFriendshipDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all friendships (filtered by query)' }) 
  @ApiResponse({ status: 201, description: 'List of friendships filtered by query (if specified)' })
  findAll(@Req() request: Request) {
      return this.friendshipsService.findByQuery(request.query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specfic friendship' }) 
  @ApiResponse({ status: 201, description: 'Specified Friendship (requesterID, requesteeID)' })
  @ApiParam({name: 'id', description: 'the id of the friendship'})
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
