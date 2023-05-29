import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request } from 'express';
import { FilterQuery } from 'mongoose';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    //console.log('wrong endpoint')
    if (request.query == null)
      return this.eventsService.findAll();
    else
      return this.eventsService.findByQuery(request.query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get(':id/attendees')

  @Get(':id/organiser')

  @Get('today')
  getEventsForToday(){
    const todaysDate = new Date();
    console.log('hi');
    const formattedDate = todaysDate.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format
    console.log(formattedDate);
    const query: FilterQuery<Event> = {date: formattedDate}
    return this.eventsService.findByQuery({ query });
  }

  @Get('thisweek')

  @Get('thismonth')

  @Get('thisyear')

  @Get(':region')

  @Get('month/:month')

  @Get('date/:date')

  @Get('year/:year')

  @Get('category/:category')

  @Get('duration/:duration')

  @Get('timeofday/:timeofday')

  @Get('org/:organisation')
  findbyOrganisation(@Param('organisation') organisation: string) {
    //const parsedOrg = organisation.replace('%20',' ');
    //console.log(parsedOrg);
    //console.log(organisation);
    //console.log(3);
    return this.eventsService.findbyOrganisation(organisation);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
