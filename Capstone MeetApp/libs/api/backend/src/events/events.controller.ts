import { Controller, Get, Post, Param,Req, Body, HttpStatus, Res, Put, Delete, BadRequestException,Query, Headers, Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' }) 
  @ApiResponse({ status: 201, description: 'Event created successfully' })
   async createEvent(@Res() response : Response, @Body() createEventdto: CreateEventDto, @Headers('x-api-key') apiXHeader: string) {
  try {
    Logger.log(`API Key: ${apiXHeader}`)
    const newStudent = await this.eventsService.create(createEventdto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Event has been created successfully',
    newStudent,});
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
  @ApiResponse({ status: 200, description: 'List of events' })
  findAll(@Req() request: Request, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    if (request.query == null)
      return this.eventsService.findAll();
    else
      return this.eventsService.findByQuery(request.query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID or special keyword (today, thisweek, thismonth, thisyear, fetch-by-ids)' })
  @ApiQuery({ name: 'eventIds', description: 'Comma-separated list of event IDs (for fetch-by-ids endpoint)', required: false })
  findOne(@Param('id') id: string, @Query('eventIds') eventIds: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    let eventIdArray : string[];
    if (id == 'today')
      return this.getEventsForToday(apiXHeader);
    switch (id) {
      case 'today':
        return this.getEventsForToday(apiXHeader);
        break;
      case 'thisweek':
        return this.getEventsForThisWeek(apiXHeader);
        break;
      case 'thismonth':
        return this.getEventsForThisMonth(apiXHeader);
        break;
      case 'thisyear':
        return this.getEventsForThisYear(apiXHeader);
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
  getEventsForToday(@Headers('x-api-key') apiXHeader: string){
    Logger.log(`API Key: ${apiXHeader}`)
    const todaysDate = new Date();
    const formattedDate = todaysDate.toISOString().split('T')[0]; 
    const query: FilterQuery<Event> = {date: formattedDate}
    return this.eventsService.findByQuery({ query });
  }

  @Get('thisweek')
  @ApiOperation({ summary: 'Find events for this week' })
  getEventsForThisWeek(@Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
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
  getEventsForThisMonth(@Headers('x-api-key') apiXHeader: string){
    Logger.log(`API Key: ${apiXHeader}`)
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
  getEventsForThisYear(@Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
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
  getEventsByRegion(@Param('region') region: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    const query: FilterQuery<Event> = { region: region };
    return this.eventsService.findByQuery(query)
  }

  @Get('month/:month')
  @ApiOperation({ summary: 'Find events for a specific month' })
  @ApiParam({ name: 'month', description: 'The month (MM format) you want to find events for', required: true })
  getEventsByMonth(@Param('month') month: string, @Headers('x-api-key') apiXHeader: string){
    Logger.log(`API Key: ${apiXHeader}`)
    const query: FilterQuery<Event> = { date: { $regex: `.*-${month}-.*` } };
    return this.eventsService.findByQuery(query)
  }

  @Get('year/:year')
  @ApiOperation({ summary: 'Find events for a specific year' })
  @ApiParam({ name: 'year', description: 'The year you want to find events for', required: true })
  getEventsByYear(@Param('year') year: string, @Headers('x-api-key') apiXHeader: string){
    Logger.log(`API Key: ${apiXHeader}`)
    const query: FilterQuery<Event> = { date: { $regex: `^${year}-.*` } };
    return this.eventsService.findByQuery(query)
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Find events for a specific region' })
  @ApiParam({ name: 'region', description: 'The region you want to find events for', required: true })
  getEventsByCategory(@Param('category') category: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    const query: FilterQuery<Event> = { category: category };
    return this.eventsService.findByQuery(query)
  }

  @Get('daterange/:startDate/:endDate')
  @ApiOperation({ summary: 'Find events for a specific date range (inclusive ranges)' })
  @ApiParam({ name: 'startDate', description: 'The lower boundary date you want to find events for', required: true })
  @ApiParam({ name: 'endDate', description: 'The upper boundary date you want to find events for', required: true })
  getEventsByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Headers('x-api-key') apiXHeader: string
  ) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.eventsService.getEventsByDateRange(startDate, endDate);
  }

  @Get('org/:organisation')
  @ApiOperation({ summary: 'Find events for a specific organisation' })
  @ApiParam({ name: 'organisation', description: 'The organisation (name) you want to find events for', required: true })
  findbyOrganisation(@Param('organisation') organisation: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.eventsService.findbyOrganisation(organisation);
  }

  @Get(':eventID/attendance-count')
  @ApiOperation({ summary: 'Find total number of people attending an event' })
  @ApiParam({ name: 'eventID', description: 'The event ID', required: true })
  getEventAttendanceCount(@Param('eventID') eventID: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.eventsService.getEventAttendanceCount(eventID);
  }


  @Put('/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({ name: 'id', description: 'The id of the event', required: true })
  @ApiResponse({ status: 201, description: 'Event has been successfully updated' })
  async updateEvent(@Res() response : Response,@Param('id') eventId: string,
  @Body() updateEventdto: UpdateEventDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
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
async deleteEvent(@Res() response: Response, @Param('id') eventId: string, @Headers('x-api-key') apiXHeader: string)
{
  Logger.log(`API Key: ${apiXHeader}`)
  try {
    const deletedEvent = await this.eventsService.remove(eventId);
    return response.status(HttpStatus.OK).json({
    message: 'Event deleted successfully',
    deletedEvent,});
  }catch (err: unknown) {
    if (err instanceof BadRequestException) {
      return response.status(err.getStatus()).json(err.getResponse());}
    else
      return err;
  }
 }

 @Get(':eventId/attendance-count')
 @ApiOperation({ summary: 'Find total number of people attending an event' })
 @ApiParam({ name: 'eventID', description: 'The event ID', required: true })
  async getEventAttendance(@Param('eventId') eventId: string, @Headers('x-api-key') apiXHeader: string): Promise<number> {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.eventsService.getEventAttendance(eventId);
  }

  
  @Get(':eventId/attendance')
  @ApiOperation({ summary: 'Find the people attending an event' })
  @ApiParam({ name: 'eventID', description: 'The event ID', required: true })
  async getAttendingUsers(@Param('eventId') eventId: string, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.eventsService.getAttendingUsers(eventId);
  }
}

