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
  @ApiOperation({summary: "View the logged-in organisation's credentials"})
  getAccount(@Request() req : AuthenticatedRequest, ) {
    
    return req.organisation;
  }


  @Get()
  @ApiBearerAuth()
  @ApiOperation({summary: "View all existing organisations"})
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
  @Get('events/top3')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 most attended events"})
  async getTop3AttendedEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3AttendedEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most attended event"})
  async getTopAttendedEvent(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopAttendedEvent(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-categories')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 most popular event categories"})
  async getTop3EventCategories(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3EventCategories(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-category')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular event category"})
  async getTopEventCategory(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopEventCategory(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-region')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular event region"})
  async getTopEventRegion(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopEventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-regions')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 most popular event region"})
  async getTop3EventRegions(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3EventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters-events')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular events attended by the organisation's top 3 supporters"})
  async getTop3SupportersAndEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporters-events')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular events attended by the organisation's top supporters"})
  async getTopSupportersAndEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopSupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 supporters"})
  async getTop3Supporters(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3Supporters(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporter')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 supporters"})
  async getTopSupporter(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopSupporter(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's list of events"})
  async getEvents(@Request() req : AuthenticatedRequest, ) {
    
    return await this.organisationsService.findEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/region-count')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the frequency of the logged-in organisation's most popular regions"})
  async getRegionCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getRegionCount(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/category-count')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the frequency of the logged-in organisation's most popular categories"})
  async getCategoryCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getCategoryCount(req.organisation.id);
  }
  
  
}
