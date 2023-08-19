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
import { CategoryCountResponse, OrganisationAccountInfo, OrganisationLoginRequest, OrganisationLoginResponse, RegionCountResponse, SupporterAndTopEvent, TopCategory, TopRegion } from '../interfaces';
import { Organisation } from './schema';
import { Event } from '../events/schema';
import { User } from '../users/schema';

interface AuthenticatedRequest extends Request {
  organisation: {id : string, username : string, password: string};
}

@Controller('organisations')
@ApiSecurity('Api-Key')
@ApiTags('Organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post('signup')
  @ApiOperation({summary: 'Sign up as a new organisation'})
  @ApiResponse({status: 201, description: 'A user access token (JWT) and a message'})
  @ApiBody({type: CreateOrganisationDto, description: 'The initial information needed to create a new organisation'})
  create(@Body() createOrganisationDto: CreateOrganisationDto, ) {
    
    return this.organisationsService.create(createOrganisationDto);
  }

  @Post('login')
  @ApiOperation({summary: "Login into an existing organisation's account"})
  @ApiResponse({status: 201, description: 'A user access token (JWT) and a message', type: OrganisationLoginResponse})
  @ApiBody({description: 'Fill in the account\'s credentials', type: OrganisationLoginRequest})
  login(@Body() LoginInfo : OrganisationLoginRequest, ){
    
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
  @ApiResponse({status: 200, description: 'View the logged-in organisation\'s session information', type: OrganisationAccountInfo})
  getAccount(@Request() req : AuthenticatedRequest, ) {
    
    return req.organisation;
  }


  @Get()
  @ApiOperation({summary: "View all existing organisations"})
  @ApiResponse({status: 200, description: 'List of all existing organisations ', type: [Organisation]})
  findAll() {
    
    return this.organisationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete('')
  @ApiBearerAuth()
  @ApiOperation({summary: "Delete a logged-in organisation's account"})
  remove(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.remove(+req.organisation.id);
  }
  @UseGuards(AuthGuard)
  @Get('events/top3')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 most attended events"})
  @ApiResponse({status: 200, description: 'List of 3 events ', type: [Event]})
  async getTop3AttendedEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3AttendedEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most attended event"})
  @ApiResponse({status: 200, description: 'Single event ', type: Event})
  async getTopAttendedEvent(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopAttendedEvent(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-categories')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 most popular event categories"})
  @ApiResponse({status: 200, description: 'List of 3 categories', type: [TopCategory]})
  async getTop3EventCategories(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3EventCategories(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-category')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular event category"})
  @ApiResponse({status: 200, description: 'Single category ', type: TopCategory})
  async getTopEventCategory(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopEventCategory(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-region')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular event region"})
  @ApiResponse({status: 200, description: 'Single region ', type: TopRegion})
  async getTopEventRegion(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopEventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-regions')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 most popular event region"})
  @ApiResponse({status: 200, description: 'List of 3 regions ', type: [TopRegion]})
  async getTop3EventRegions(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3EventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters-events')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular events attended by the organisation's top 3 supporters"})
  @ApiResponse({status: 200, description: 'List of 3 users and their top attended event ', type: [SupporterAndTopEvent]})
  async getTop3SupportersAndEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporters-events')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's most popular events attended by the organisation's top supporters"})
  @ApiResponse({status: 200, description: 'Single user and their top attended event ', type: SupporterAndTopEvent})
  async getTopSupportersAndEvents(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopSupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 supporters"})
  @ApiResponse({status: 200, description: 'List of 3 users ', type: [User]})
  async getTop3Supporters(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTop3Supporters(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporter')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's top 3 supporters"})
  @ApiResponse({status: 200, description: 'Single user', type: User})
  async getTopSupporter(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getTopSupporter(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the logged-in organisation's list of events"})
  @ApiResponse({status: 200, description: 'List of events ', type: Event})
  async getEvents(@Request() req : AuthenticatedRequest, ) {
    
    return await this.organisationsService.findEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/region-count')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the frequency of the logged-in organisation's regions"})
  @ApiResponse({status: 200, description: 'List of categories and their frequency (amount of times used)', type: [RegionCountResponse]})
  async getRegionCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getRegionCount(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/category-count')
  @ApiBearerAuth()
  @ApiOperation({summary: "View the frequency of the logged-in organisation's categories"})
  @ApiResponse({status: 200, description: 'List of categories and their frequency (amount of times used)', type: [CategoryCountResponse]})
  async getCategoryCount(@Request() req : AuthenticatedRequest, ) {
    
    return this.organisationsService.getCategoryCount(req.organisation.id);
  }
  
  
}
