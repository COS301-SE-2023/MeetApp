import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  Headers,
  UseGuards,
  Logger
} from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { AuthGuard } from './organisations.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  organisation: {id : string, username : string, password: string};
}

@Controller('organisations')
@ApiTags('Organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post('signup')
  @ApiOperation({summary: 'sign up as a new organisation'})
  @ApiResponse({status: 201, description: 'A user access token (JWT) and a message'})
  @ApiBody({type: 'application/json', description: 'JSON object containing: username : string, password : string, name :string, events : [ObjectId]'})
  create(@Body() createOrganisationDto: CreateOrganisationDto, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.create(createOrganisationDto);
  }

  @Post('login')
  login(@Body() LoginInfo : UpdateOrganisationDto, @Headers('x-api-key') apiXHeader: string){
    Logger.log(`API Key: ${apiXHeader}`)
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
  getAccount(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return req.organisation;
  }


  @Get()
  findAll(@Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete('')
  remove(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.remove(+req.organisation.id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/events/top3')
  async getTop3AttendedEvents(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTop3AttendedEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top')
  async getTopAttendedEvent(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTopAttendedEvent(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-categories')
  async getTop3EventCategories(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTop3EventCategories(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-category')
  async getTopEventCategory(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTopEventCategory(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-region')
  async getTopEventRegion(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTopEventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-regions')
  async getTop3EventRegions(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTop3EventRegion(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters-events')
  async getTop3SupportersAndEvents(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTop3SupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporters-events')
  async getTopSupportersAndEvents(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTopSupportersAndTheirTopEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top3-supporters')
  async getTop3Supporters(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTop3Supporters(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/top-supporter')
  async getTopSupporter(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getTopSupporter(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events')
  async getEvents(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return await this.organisationsService.findEvents(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/region-count')
  async getRegionCount(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getRegionCount(req.organisation.id);
  }

  @UseGuards(AuthGuard)
  @Get('events/category-count')
  async getCategoryCount(@Request() req : AuthenticatedRequest, @Headers('x-api-key') apiXHeader: string) {
    Logger.log(`API Key: ${apiXHeader}`)
    return this.organisationsService.getCategoryCount(req.organisation.id);
  }
  
  
}
