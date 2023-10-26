import { Controller, Get, Post, Param,Req, Body, HttpStatus, Res, Put, Delete, BadRequestException,Query, } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { User } from '../users/schema';
import { NewEventResponse, UpdateEventResponse } from '../interfaces';
import { Event } from './schema';

@Controller('events')
@ApiSecurity('Api-Key')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event'})
  @ApiBody({description: 'Fill in information about the event', type: CreateEventDto})
  @ApiResponse({ status: 201, description: 'Event created successfully', type: NewEventResponse})
   async createEvent(@Res() response : Response, @Body() createEventdto: CreateEventDto, ) {
  try {
    
    const newEvent = await this.eventsService.create(createEventdto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Event has been created successfully',
    newEvent,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Event not created!',
    error: 'Bad Request'
 });
 }
}

  @Get()
  @ApiOperation({ summary: 'Find all events' })
  @ApiResponse({ status: 200, description: 'List of events' , type : [Event]})
  findAll(@Req() request: Request, ) {
    
    if (request.query == null)
      return this.eventsService.findAll();
    else
      return this.eventsService.findByQuery(request.query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID or special keyword (today, thisweek, thismonth, thisyear, fetch-by-ids)' })
  @ApiQuery({ name: 'eventIds', description: 'Comma-separated list of event IDs (for fetch-by-ids endpoint)', required: false })
  @ApiResponse({ status: 200, description: 'an event', type: Event})
  findOne(@Param('id') id: string, @Query('eventIds') eventIds: string, ) {
    
    let eventIdArray : string[];
    if (id == 'today')
      return this.getEventsForToday();
    switch (id) {
      case 'today':
        return this.getEventsForToday();
        break;
      case 'thisweek':
        return this.getEventsForThisWeek();
        break;
      case 'thismonth':
        return this.getEventsForThisMonth();
        break;
      case 'thisyear':
        return this.getEventsForThisYear();
        break;
      case 'fetch-by-ids':
        eventIdArray = eventIds.split(',');
        return this.eventsService.fetchEventsByIds(eventIdArray);
        break;
    
      default:
        return this.eventsService.findOne(id);
        break;
    }
    
  }

  @Get('today')
  @ApiOperation({ summary: 'Find events for today' })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsForToday(){
    
    const todaysDate = new Date();
    const formattedDate = todaysDate.toISOString().split('T')[0]; 
    const query: FilterQuery<Event> = {date: formattedDate}
    return this.eventsService.findByQuery({ query });
  }

  @Get('thisweek')
  @ApiOperation({ summary: 'Find events for this week' })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsForThisWeek() {
    
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const formattedStartDate = startOfWeek.toISOString().split('T')[0]; 
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));
    const formattedEndDate = endOfWeek.toISOString().split('T')[0]; 

    const query: FilterQuery<Event> = {
      date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return this.eventsService.findByQuery(query)
  }

  @Get('thismonth')
  @ApiOperation({ summary: 'Find events for this month' })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsForThisMonth(){
    
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const formattedStartDate = startOfMonth.toISOString().split('T')[0]; 
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formattedEndDate = endOfMonth.toISOString().split('T')[0]; 

    const query: FilterQuery<Event> = {
      date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return this.eventsService.findByQuery(query)
  }

  @Get('thisyear')
  @ApiOperation({ summary: 'Find events for this year' })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsForThisYear() {
    
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const formattedStartDate = startOfYear.toISOString().split('T')[0]; 
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    const formattedEndDate = endOfYear.toISOString().split('T')[0]; 
    const query: FilterQuery<Event> = {
      date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return this.eventsService.findByQuery(query)
  }

  @Get('region/:region')
  @ApiOperation({ summary: 'Find events for a specific region' })
  @ApiParam({ name: 'region', description: 'The region you want to find events for', required: true })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsByRegion(@Param('region') region: string, ) {
    
    const query: FilterQuery<Event> = { region: region };
    return this.eventsService.findByQuery(query)
  }

  @Get('month/:month')
  @ApiOperation({ summary: 'Find events for a specific month' })
  @ApiParam({ name: 'month', description: 'The month (MM format) you want to find events for', required: true })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsByMonth(@Param('month') month: string, ){
    
    const query: FilterQuery<Event> = { date: { $regex: `.*-${month}-.*` } };
    return this.eventsService.findByQuery(query)
  }

  @Get('year/:year')
  @ApiOperation({ summary: 'Find events for a specific year' })
  @ApiParam({ name: 'year', description: 'The year you want to find events for', required: true })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsByYear(@Param('year') year: string, ){
    
    const query: FilterQuery<Event> = { date: { $regex: `^${year}-.*` } };
    return this.eventsService.findByQuery(query)
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Find events for a specific region' })
  @ApiParam({ name: 'region', description: 'The region you want to find events for', required: true })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsByCategory(@Param('category') category: string, ) {
    
    const query: FilterQuery<Event> = { category: category };
    return this.eventsService.findByQuery(query)
  }

  @Get('daterange/:startDate/:endDate')
  @ApiOperation({ summary: 'Find events for a specific date range (inclusive ranges)' })
  @ApiParam({ name: 'startDate', description: 'The lower boundary date you want to find events for', required: true })
  @ApiParam({ name: 'endDate', description: 'The upper boundary date you want to find events for', required: true })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getEventsByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    
  ) {
    
    return this.eventsService.getEventsByDateRange(startDate, endDate);
  }

  @Get('org/:organisation')
  @ApiOperation({ summary: 'Find events for a specific organisation' })
  @ApiParam({ name: 'organisation', description: 'The organisation (name) you want to find events for', required: true })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  findbyOrganisation(@Param('organisation') organisation: string, ) {
    
    return this.eventsService.findbyOrganisation(organisation);
  }

  @Get(':eventID/attendance-count')
  @ApiOperation({ summary: 'Find total number of people attending an event' })
  @ApiParam({ name: 'eventID', description: 'The event ID', required: true })
  @ApiResponse({ type: [User], description: 'A list of users'})
  getEventAttendanceCount(@Param('eventID') eventID: string, ) {
    
    return this.eventsService.getEventAttendanceCount(eventID);
  }


  @Put('/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({ name: 'id', description: 'The id of the event', required: true })
  @ApiResponse({ status: 201, description: 'Event has been successfully updated', type: UpdateEventResponse})
  async updateEvent(@Res() response : Response,@Param('id') eventId: string,
  @Body() updateEventdto: UpdateEventDto, ) {
    
    try {
      const exisitingEvent = await this.eventsService.update(eventId, updateEventdto);
      return response.status(HttpStatus.OK).json({
        message: 'Event has been successfully updated',
        exisitingEvent,});
    } catch (err: unknown) {
      if (err instanceof BadRequestException) {
        return response.status(err.getStatus()).json(err.getResponse());}
      else
        return err;
      }
}

@Delete('/:id')
@ApiOperation({ summary: 'Delete an event' })
@ApiParam({ name: 'id', description: 'The id of the event', required: true })
@ApiResponse({ status: 201, description: 'Event has been deleted successfully' })
async deleteEvent(@Res() response: Response, @Param('id') eventId: string, )
{
    return await this.eventsService.remove(eventId);
  
 }

 @Get(':eventId/attendance-count')
 @ApiOperation({ summary: 'Find total number of people attending an event' })
 @ApiParam({ name: 'eventID', description: 'The event ID', required: true })
 @ApiResponse({type: 'number', description: 'the number of people attending the event'})
  async getEventAttendance(@Param('eventId') eventId: string, ): Promise<number> {
    
    return this.eventsService.getEventAttendance(eventId);
  }

  
  @Get(':eventId/attendance')
  @ApiOperation({ summary: 'Find the people attending an event' })
  @ApiParam({ name: 'eventID', description: 'The event ID', required: true })
  @ApiResponse({ type: [User], description: 'A list of users'})
  async getAttendingUsers(@Param('eventId') eventId: string, ) {
    
    return this.eventsService.getAttendingUsers(eventId);
  }

  @Get('feed/sort')
  @ApiOperation({ summary: 'Find sorted events starting from today' })
  @ApiResponse({ status: 200, description: 'list of events', type: Event})
  getFeed(){
    return this.eventsService.getFeed()
  }
}

