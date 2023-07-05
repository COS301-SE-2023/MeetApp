import { Controller, Get, Post, Param,Req, Body, HttpStatus, Res, Put, Delete, BadRequestException,Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { UpdateEventDto } from './dto/update-event.dto';

//import { Category } from '../utils/enums';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
   async createEvent(@Res() response : Response, @Body() createEventdto: CreateEventDto) {
  try {
    const newStudent = await this.eventsService.create(createEventdto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Event has been created successfully',
    newStudent,});
 } catch (err) {
    console.log(err)
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Event not created!',
    error: 'Bad Request'
 });
 }
}

  @Get()
  findAll(@Req() request: Request) {
    console.log(request);
    if (request.query == null)
      return this.eventsService.findAll();
    else
      return this.eventsService.findByQuery(request.query)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('eventIds') eventIds: string) {
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
  getEventsForThisWeek() {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const formattedStartDate = startOfWeek.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));
    const formattedEndDate = endOfWeek.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format

    const query: FilterQuery<Event> = {
      date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return this.eventsService.findByQuery(query)
  }

  @Get('thismonth')
  getEventsForThisMonth(){
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const formattedStartDate = startOfMonth.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formattedEndDate = endOfMonth.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format

    const query: FilterQuery<Event> = {
      date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return this.eventsService.findByQuery(query)
  }

  @Get('thisyear')
  getEventsForThisYear() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const formattedStartDate = startOfYear.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    const formattedEndDate = endOfYear.toISOString().split('T')[0]; // Get 'yyyy-mm-dd' format

    const query: FilterQuery<Event> = {
      date: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
    return this.eventsService.findByQuery(query)
  }

  @Get('region/:region')
  getEventsByRegion(@Param('region') region: string) {
    const query: FilterQuery<Event> = { region: region };
    return this.eventsService.findByQuery(query)
  }

  @Get('month/:month')
  getEventsByMonth(@Param('month') month: string){
    const query: FilterQuery<Event> = { date: { $regex: `.*-${month}-.*` } };
    return this.eventsService.findByQuery(query)
  }

  @Get('year/:year')
  getEventsByYear(@Param('year') year: string){
    const query: FilterQuery<Event> = { date: { $regex: `^${year}-.*` } };
    return this.eventsService.findByQuery(query)
  }

  @Get('category/:category')
  getEventsByCategory(@Param('category') category: string) {
    const query: FilterQuery<Event> = { category: category };
    return this.eventsService.findByQuery(query)
  }

 // @Get('duration/:duration')

  @Get('daterange/:startDate/:endDate')
  getEventsByDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.eventsService.getEventsByDateRange(startDate, endDate);
  }

  @Get('timeofday/:timeofday')

  @Get('org/:organisation')
  findbyOrganisation(@Param('organisation') organisation: string) {
    //const parsedOrg = organisation.replace('%20',' ');
    //console.log(parsedOrg);
    //console.log(organisation);
    //console.log(3);
    return this.eventsService.findbyOrganisation(organisation);
  }


  @Put('/:id')
  async updateEvent(@Res() response : Response,@Param('id') eventId: string,
  @Body() updateEventdto: UpdateEventDto) {
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
async deleteEvent(@Res() response: Response, @Param('id') eventId: string)
{
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
 }}

