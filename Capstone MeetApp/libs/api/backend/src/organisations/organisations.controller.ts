import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards
} from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { AuthGuard } from './organisations.guard';

interface AuthenticatedRequest extends Request {
  organisation: {id : string, username : string, password: string};
}

@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post('signup')
  create(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationsService.create(createOrganisationDto);
  }

  @Post('login')
  login(@Body() LoginInfo : UpdateOrganisationDto){
    if (LoginInfo != null){
      if (LoginInfo.password != null && LoginInfo.username != null)
        return this.organisationsService.login(LoginInfo.username,LoginInfo.password)
      else 
        return {organisation : null, message: "username or password missing"}
    }
    else
      return {organisation: null, message : "No payload found"}
  }

  @UseGuards(AuthGuard)
  @Get('account')
  getAccount(@Request() req : AuthenticatedRequest) {
      return req.organisation;
  }


  @Get()
  findAll() {
    return this.organisationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete('')
  remove(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.remove(+req.organisation.id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/events/top3')
  async getTop3AttendedEvents(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTop3AttendedEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top')
  async getTopAttendedEvent(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTopAttendedEvent(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-categories')
  async getTop3EventCategories(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTop3EventCategories(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-category')
  async getTopEventCategory(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTopEventCategory(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-region')
  async getTopEventRegion(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTopEventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-regions')
  async getTop3EventRegions(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTop3EventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters-events')
  async getTop3SupportersAndEvents(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporters-events')
  async getTopSupportersAndEvents(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTopSupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters')
  async getTop3Supporters(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTop3Supporters(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporter')
  async getTopSupporter(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getTopSupporter(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events')
  async getEvents(@Request() req : AuthenticatedRequest) {
    return await this.organisationsService.findEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/region-count')
  async getRegionCount(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getRegionCount(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/category-count')
  async getCategoryCount(@Request() req : AuthenticatedRequest) {
    return this.organisationsService.getCategoryCount(req.organisation.id);
  }
  
  
}
