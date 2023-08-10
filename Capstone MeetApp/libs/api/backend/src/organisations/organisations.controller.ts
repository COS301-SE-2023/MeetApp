import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { AuthGuard } from './organisations.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags, ApiBody, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  organisation: {id : string, username : string, password: string};
}

@Controller('organisations')
@ApiSecurity('Api-Key')
@ApiTags('Organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post('signup')
  @ApiOperation({summary: 'sign up as a new organisation'})
  @ApiResponse({status: 201, description: 'A user access token (JWT) and a message'})
  @ApiBody({type: 'application/json', description: 'JSON object containing: username : string, password : string, name :string, events : [ObjectId]'})
  create(@Body() createOrganisationDto: CreateOrganisationDto, ) {
    
    return this.organisationsService.create(createOrganisationDto);
  }

  @Post('login')
  login(@Body() LoginInfo : UpdateOrganisationDto, ){
    
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
  @ApiBearerAuth()
  getAccount(@Request() req : AuthenticatedRequest, ) {
    
    return req.organisation;
  }


  @Get()
  @ApiBearerAuth()
  findAll() {
    
    return this.organisationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete('')
  @ApiBearerAuth()
  remove(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.remove(+req.organisation.id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/events/top3')
  @ApiBearerAuth()
  async getTop3AttendedEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3AttendedEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top')
  @ApiBearerAuth()
  async getTopAttendedEvent(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopAttendedEvent(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-categories')
  @ApiBearerAuth()
  async getTop3EventCategories(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3EventCategories(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-category')
  @ApiBearerAuth()
  async getTopEventCategory(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopEventCategory(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-region')
  @ApiBearerAuth()
  async getTopEventRegion(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopEventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-regions')
  @ApiBearerAuth()
  async getTop3EventRegions(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3EventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters-events')
  @ApiBearerAuth()
  async getTop3SupportersAndEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporters-events')
  @ApiBearerAuth()
  async getTopSupportersAndEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopSupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters')
  @ApiBearerAuth()
  async getTop3Supporters(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3Supporters(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporter')
  @ApiBearerAuth()
  async getTopSupporter(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopSupporter(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events')
  @ApiBearerAuth()
  async getEvents(@Request() req : AuthenticatedRequest, ) {
    
    return await this.organisationsService.findEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/region-count')
  @ApiBearerAuth()
  async getRegionCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getRegionCount(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/category-count')
  @ApiBearerAuth()
  async getCategoryCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getCategoryCount(req.organisation.id);
  }
  
  
}
